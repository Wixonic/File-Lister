# File Lister

This action list all repository's files in a part of the README.

[![File Lister](https://github.com/Wixonic/File-Lister/actions/workflows/file-lister.yml/badge.svg)](https://github.com/Wixonic/File-Lister/actions/workflows/file-lister.yml)

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

<code>&lt;!-- File Lister Display -->&lt;!-- File Lister Display --></code>

## Example Result

<!-- File Lister Display -->
> **Last Update**: 27/02/2022 08:44:02 UTC

```
─── (5 KB) 
    └── .github (326 B) 
        └── workflows (326 B) 
            └── file-lister.yml (326 B)
    └── README.md (1.1 KB)
    └── action.yml (352 B)
    └── main.js (3.2 KB)
```
<!-- File Lister Display -->
