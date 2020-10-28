import * as inquirer from 'inquirer';
import simpleGit, {SimpleGit} from 'simple-git';
import { repos } from '../constants';
export async function create(context) {
  const repoInfo = await listRepos(context);
  await cloneRepo(context, repoInfo);
}

async function listRepos(context) {
  const listReposQuestion = [{
    type: 'list',
    name: 'repo',
    message: 'Choose which repo you want to use:',
    choices: Object.keys(repos.list),
  }];
  const repoChoice = await inquirer.prompt(listReposQuestion);
  //Ask if it is the right repo
  return(repos.list[repoChoice.repo]);
}

async function cloneRepo(context, repoInfo){
  const git = simpleGit();
  const configureQuestions = [{
    type: 'input',
    name: 'projectName',
    message: 'Enter your project name:',
    default: repoInfo.projectName
  }];
  const configuration = await inquirer.prompt(configureQuestions);
  await git.clone(repoInfo.url, `./${configuration.projectName}`);
  context.print.info(`Project has been created. To get started you can simply run:\n\n\tcd ./${configuration.projectName}\n\tamplify init\n\tamplify push`);
}