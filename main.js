const core = require("@actions/core");
const github = require("@actions/github");

const TOKEN = core.getInput("TOKEN",{
	required: true
});

const ignore = (core.getInput("ignore") || "").split(",");

const Payload = github.context.payload;

const REST = require("@octokit/request").request.defaults({
	headers: {
		authorization:`token ${TOKEN}`
	}
});

const GraphQL = require("@octokit/graphql").defaults({
	headers: {
		authorization:`token ${TOKEN}`
	}
});

const GetFiles = async (Path="") => {
	const Datas = await GraphQL(`{
  repository(owner: "${Payload.repository.owner.login}", name: "${Payload.repository.name}"){
	object(expression: "HEAD:${Path}") {
	  ... on Tree {
		entries {
		  path,
		  name,
		  type,
		  object {
			... on Blob {
			  byteSize
			}
		  }
		}
	  }
	}
  }
}`);
	
	try {
		return Datas.repository.object.entries;
	} catch(e) {
		throw "Invalid response: " + e;
	}
};

const FormatSize = (Size=0) => {
	if (Size < 1000) {
		return `${Size} B`;
	} else if (Size < 1000000) {
		Size /= 1000;
		return `${Number(Size.toFixed(1))} KB`;
	} else if (Size < 1000000000) {
		Size /= 1000000;
		return `${Number(Size.toFixed(1))} MB`;
	} else {
		Size /= 1000000000;
		return `${Number(Size.toFixed(1))} GB`;
	}
};

let Executions = 0;

const FormatPath = async (Path="") => {
	Executions++;
	let Text = "";
	let TotalSize = 0;
	
	const Files = await GetFiles(Path);
	
	for (let ID = 0; ID < Files.length; ++ID) {
		const File = Files[ID];
		
		if (ignore.indexOf(Path + File.name) < 0) {
			Text += "\n";
			
			for (let x = 0; x < Executions; ++x) {
				Text += "    ";
			}
			
			if (File.type == "tree") {
				const FormatedPath = await FormatPath(File.path);
				Text += `└── ${File.name} ${FormatedPath.text}`;
				TotalSize += FormatedPath.size;
			} else if (File.type == "blob") {
				TotalSize += File.object.byteSize;
				Text += `└── ${File.name} (${FormatSize(File.object.byteSize)})`;
			} else {
				Text += `└── ${File.name} (${File.type})`;
			}
		} else {
			console.log(Path + File.name + " ignored");
		}
	}
	
	Executions--;
	return {
		text: `(${FormatSize(TotalSize)}) ${Text}`,
		size: TotalSize
	};
};

(async () => {
	const README = (await REST(`GET /repos/${Payload.repository.owner.login}/${Payload.repository.name}/contents/README.md`)).data;
	
	let Content = decodeURIComponent(escape(atob(README.content.split("\n").join(""))));
	
	Content = Content.split("<!-- File Lister Display -->");
	
	const Now = new Date();
	
	const AddZeros = (n=0,z=2) => {
		let s = String(n);
		
		for (let x = s.length; x < z; ++x) {
			s = "0" + s;
		}
		
		return s;
	};
	
	Content[1] = `
> **Last Update**: ${AddZeros(Now.getUTCDate())}/${AddZeros(Now.getUTCMonth() + 1)}/${Now.getUTCFullYear()} ${AddZeros(Now.getUTCHours())}:${AddZeros(Now.getUTCMinutes())}:${AddZeros(Now.getUTCSeconds())} UTC

\`\`\`
─── ${(await FormatPath()).text}
\`\`\`
`;
	
	Content = Content.join("<!-- File Lister Display -->");
	
	await REST(`PUT /repos/${Payload.repository.owner.login}/${Payload.repository.name}/contents/README.md`,{
		sha: README.sha,
		message: "File Listing",
		content: btoa(unescape(encodeURIComponent(Content)))
	});
})();