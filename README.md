# pls-parser

Parse and create PLS playlist files

## Usage

In JavaScript

```js
const { parse, stringify } = require("pls-parser")
const { readFileSync, writeFileSync } = require("fs")

const raw = readFileSync("./playlist.pls", { encoding: "utf-8" })

const parsed = parse(raw)

const json = readFileSync("./playlist.json", { encoding: "utf-8" })

const pls = stringify(json)
```

Or in TypeScript

```ts
import { parse, stringify } from "pls-parser"
import { readFileSync } from "fs"

const raw = readFileSync("./playlist.pls", { encoding: "utf-8" })

const parsed = parse(raw)

const json = readFileSync("./playlist.json", { encoding: "utf-8" })

const pls = stringify(json)
```
