import { NamelistInputDialog } from "./domain-wizard.dialog.namelist.input";

export class NamelistInputPage {

    constructor(options) {
        this.loader = document.getElementById('page-loader');
        this.dialog = new NamelistInputDialog(options);
        this.githubExampleList = document.getElementById('github-examples');

        this.buttonOpen = document.getElementById('button-open');
        this.buttonOpen.addEventListener('click', (e) => {
            this.inputFile.value = null;
            this.inputFile.click();
        });

        this.inputFile = document.getElementById('file-open');
        this.inputFile.addEventListener('change', (e) => {
            if (!e.target.files || e.target.files.length == 0) {
                return;
            }

            const reader = new FileReader();

            reader.onload = async (e) => {
                await this.dialog.openNamelistInputAsync(e.target.result);
            };

            reader.readAsText(e.target.files[0]);

            this.inputFile.value = null;
        });
    }

    async loadGitHubExamplesAsync() {

        this.loader.style['display'] = 'block';
        this.githubExampleList.style['display'] = 'none';
        this.githubExampleList.querySelectorAll('button').forEach((button) => button.remove());

        const url = "https://api.github.com/repos/wrf-model/WRF/git/trees/master?recursive=1";
        let response = await fetch(url);
        const gitTree = await response.json();

        let row = 0;
        for (let item of gitTree["tree"]) {

            if (item["type"] === undefined || 
                item["path"] === undefined || 
                item["type"].toLowerCase() !== "blob" || 
                !item["path"].toLowerCase().startsWith('test/em_real/namelist.input')) {
                continue;
            }

            var button = document.createElement('button');
            this.githubExampleList.append(button);

            button.type = "button";
            button.dataset['path'] = item['path'];
            button.dataset['url'] = item['url'];
            button.innerText = item['path'];
            
            button.classList.add("list-group-item");
            button.classList.add("list-group-item-action");

            if (row % 2 == 0) {
            }
            else {
                button.classList.add('list-group-item-secondary');
            }
            row += 1;

            button.addEventListener('click', async (e) => {
                const button = e.currentTarget ?? e.target;
                let content = button.dataset['content'];

                if (content === undefined) {
                    const url = button.dataset['url'];
                    const response = await fetch(url);
                    const blob = await response.json();
                    content = blob['content'];
                    button.dataset['content'] = content;
                }
                await this.dialog.openNamelistInputAsync(atob(content));
            });
        }        

        this.githubExampleList.style['display'] = 'block';
        this.loader.style['display'] = 'none';
    }
}