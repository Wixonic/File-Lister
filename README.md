# File Lister

This action list all repository's files in a part of the README.

## Inputs

### `TOKEN`

**Required** The GitHub Access Token.

### `ignore`

A comma-separated (without space) list of paths that Will be ignored.

## Example Workflow

```yaml
- name: Checkout
  uses: actions/checkout@v2
- name: File Lister
  uses: Wixonic/File-Lister@1.0
    with:
      TOKEN: ${{ secrets.GITHUB_TOKEN }}
      ignore: ".github,.gitattribute"
```

**Don't forget** to put this on the README.md:

```html
<!-- File Lister Display -->
Will be updated...
<!-- File Lister Display -->
```

## Example Result

<!-- File Lister Display -->
Will be updated...
<!-- File Lister Display -->
