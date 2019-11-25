const {execSync} = require("child_process")
const fs = require("fs")
const os = require("os")
const path = require("path")

function commandForFrequency(frequency, duration, filePath) {
	return `echo "y" | ffmpeg -f lavfi -i "sine=frequency=${frequency}:duration=${duration}" -f mp3 /dev/stdout > ${filePath}`
}


//Currently only generate 1 second clips.
[1].forEach((duration) => {
	let folder = path.join(__dirname, duration + "sec")
	
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder, {recursive: true})
	}

	let start = 20
	let finish = 20000
	let current = start

	let currentParalell = 0
	let maxParalell = os.cpus().length
	let command = "echo 'Done'"

	while (true) {

		let frequency = current++

		let filePath = path.join(folder, frequency + ".mp3")
		if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {continue;} //Don't recreate the file.

		if (frequency > finish) {execSync(command);break;} //We are done. Don't add this file.

		if (command === "echo 'Done'") {
			command = commandForFrequency(frequency, duration, path.resolve(filePath))
		}
		else {
			command += " & " + commandForFrequency(frequency, duration, path.resolve(filePath))
		}

		currentParalell++

		if (frequency >= finish) {execSync(command);break;} //We are done.

		if (currentParalell === maxParalell) {
			console.log(command)
			execSync(command)
			console.log('\x1b[33m%s\x1b[0m', "\n" + duration + "sec " + frequency + " hertz\n")
			command = "echo 'Done'"
			currentParalell = 0
		}	
	}
})


