const vscode = require('vscode');


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Activated!');

	const create = vscode.commands.registerTextEditorCommand('pastebin-plugin.create', (textEditor) => {
		
		let selected = textEditor.document.getText(textEditor.selection);
		let nameArr = textEditor.document.fileName.split(".");
		let extension = nameArr[nameArr.length - 1];
		let path = '/create/?text='

		if (selected == "") {
			selected = textEditor.document.getText();
		}

		path = path + selected + '&extension=' + extension;
		let url = 'https://vs-code-api.herokuapp.com/create/';
		//url = encodeURI(url);

		let body = 'text=' + encodeURIComponent(selected) + '&extension=' + encodeURIComponent(extension);

		let XMLHttpRequest = require('xhr2');
		let request = new XMLHttpRequest();
		request.open("POST", url, true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		request.send(body);
		request.onload = function() {
			if (request.status != 200) {
				vscode.window.showInformationMessage(`Server error ${request.status}: ${request.statusText}`)
			} else {
				//vscode.window.showInformationMessage(url + body);
				if (request.response.split(" ")[0] == "Error:") {
					vscode.env.clipboard.writeText('');
					vscode.window.showInformationMessage(request.response);
				} else {
					vscode.env.clipboard.writeText(request.response);
					vscode.window.showInformationMessage("Pastebin plugin: successful");
				}
			}
		}
	});

	context.subscriptions.push(create);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
