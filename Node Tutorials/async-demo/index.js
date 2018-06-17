console.log('before');
GetUser(1,displayUser);
console.log('after');

function displayCommits(commits)
{
    console.log(commits);
}
function displayRepo(repo){
    console.log('Repos: ',repo);
    //getCommits(repo,displayCommits);
}
function displayUser(user)
{
    GetRepo(user.gituser,displayRepo);
        
        
}

function GetUser(id,callback){
    setInterval(()=>{
        console.log('reading');
        callback({id:id,gituser:"name"});    
    },2000);
    
}
function GetRepo(name,username)
{
    setInterval(()=>{
        username([name,'repo1','repo2','repo3']);
    },2000);
    
}