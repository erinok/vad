const vad = require("@ricky0123/vad-node")
const wav = require("wav-decoder")
const fs = require("fs")

const audioSamplePath = `/Users/erin/mdm/Negotiator/Logs/vad-bad-start/audio.txt`

function loadNums(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split('\n').filter(line => line.trim() !== '');
  return [lines.map(line => parseFloat(line.trim())), 16000];
}


function loadWav(audioPath) {
  let buffer = fs.readFileSync(audioPath)
  let result = wav.decode.sync(buffer)
  let audioData = new Float32Array(result.channelData[0].length)
  for (let i = 0; i < audioData.length; i++) {
    for (let j = 0; j < result.channelData.length; j++) {
      audioData[i] += result.channelData[j][i]
    }
  }
  return [audioData, result.sampleRate]
}

const main = async () => {
  const path = process.argv[2];
  const [audioData, sampleRate] = path.endsWith(".wav") ? loadWav(path) : loadNums(path);

  const myvad = await vad.NonRealTimeVAD.new()
  for await (const { audio, start, end } of myvad.run(audioData, sampleRate)) {
    console.log(`Speech segment: ${start}, ${end}`)
  }
}

main()
