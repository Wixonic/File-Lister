# File Lister

This action list all repository's files in a part of the README.

[![File Lister](https://github.com/Wixonic/File-Lister/actions/workflows/file-lister.yml/badge.svg)](https://github.com/Wixonic/File-Lister/actions/workflows/file-lister.yml)

## Inputs

### `TOKEN`

**Required** The GitHub Access Token.

### `ignore`

A comma-separated (without space) list of paths that will be ignored.

## Example Workflow

```yaml
- name: Checkout
  uses: actions/checkout@v2
- name: File Lister
  uses: Wixonic/File-Lister@1.0.1
    with:
      TOKEN: ${{ secrets.GITHUB_TOKEN }}
      ignore: ".github,.gitattribute"
```

**Don't forget** to put this on the `README.md`:

<code>&lt;!-- File Lister Display --></code>

<code>&lt;!-- File Lister Display --></code>

## Example Result

<!-- File Lister Display -->
> **Last Update**: 08/07/2022 11:49:23 UTC

```
─── (6.9 KB) 
    └── .github (328 B) 
        └── workflows (328 B) 
            └── file-lister.yml (328 B)
    └── 404.html (1.9 KB)
    └── CNAME (22 B)
    └── README.md (1.2 KB)
    └── action.yml (352 B)
    └── main.js (3.2 KB)
```
<!-- File Lister Display -->
