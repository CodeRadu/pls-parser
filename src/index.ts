type seconds = number

interface Song {
  fileName: string
  title: string
  length: seconds
}

export function parse(content: string) {
  if (!content.startsWith("[playlist]")) {
    throw new Error("Content not playlist")
  }
  const songs: Song[] = []
  const carReturn = content.includes("\r")
  const lines = carReturn ? content.split("\r\n").slice(1) : content.split("\n").slice(1)
  for (const idx in lines) {
    const line = lines[idx]
    const prop = line.split("=")[0]
    const data = line.split("=")[1]
    const fileNumber = parseInt(prop.split("File")[1])
    const titleNumber = parseInt(prop.split("Title")[1])
    const lengthNumber = parseInt(prop.split("Length")[1])
    if (fileNumber) {
      if (songs[fileNumber - 1] == undefined) songs[fileNumber - 1] = { fileName: "", title: "", length: 0 }
      songs[fileNumber - 1].fileName = data
    }
    if (titleNumber) {
      if (songs[titleNumber - 1] == undefined) songs[titleNumber - 1] = { fileName: "", title: "", length: 0 }
      songs[titleNumber - 1].title = data
    }
    if (lengthNumber) {
      if (songs[lengthNumber - 1] == undefined) songs[lengthNumber - 1] = { fileName: "", title: "", length: 0 }
      songs[lengthNumber - 1].length = parseInt(data)
    }
  }
  return songs
}

export function stringify(content: Song[]) {
  let str = "[playlist]"
  for (const idx in content) {
    const song = content[idx]
    const fileIdx = parseInt(idx) + 1
    str += `\nFile${fileIdx}=${song.fileName}`
    str += `\nTitle${fileIdx}=${song.title}`
    str += `\nLength${fileIdx}=${song.length}`
  }
  str += `\nNumberOfEntries=${content.length}`
  str += `\nVersion=2`
  return str
}