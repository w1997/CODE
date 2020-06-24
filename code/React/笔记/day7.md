### git 中的分支
+ 分支方便多人进行协同工作，每个分支上所进行的操作都各不影响，每个人所负责的功能在没完成的时候并不会对其它功能造成影响。
+ 分支的基本操作
  + 查看当前分支：git branch
  + 创建分支：git branch 分支名 
  + 切换分支：git checkout 分支名
  + 分支的合并：git checkout master + git merge 分支名
  + 分支的删除：git branch -d 分支名
  注：1）git checkout -b dev //创建并切换到dev分支
    2)分支合并的时候需要先把分支切换到mater
    3)新创建的分支会包含有之前的文件
    4）在本地文件中get clone 拿到远程仓库的内容，会发现只有一个master分支，用git checkout -b dev origin/dev; 其中origin代表远程仓库的地址；
    5）在分支上完成当前的操作时，需要在本地仓库对代码进行提交，在本地文件对已经提交的文件进行更新 git push origin dev
+ 分支的简单使用
1）在本地创建一个本地仓库movie：创建一个文件夹movie，然后鼠标右键进入git bash here,然后
`git init`就可以在movie文件中看到一个.git文件，说明创建本地仓库成功。
2）然后先在当前文件夹中创建一个测试文件test，然后 `git add *`,`git commit -m "xx功能已经完成"`,关联远程仓库`git remote add origin https://github.com/自己github的用户名/远程仓库名.git `，最后把代码推送到远程仓库`git push -u origin master`。
3）创建一个分支dev,并切换到该分支，`git checkout -b dev `，会出现一行提示`Switched to a new branch 'dev'`说明创建成功。
4）然后把dev分支上创建的文件提交到远程仓库
    ```
     git add *
     git commit -m "完成简单的页面"
     git push origin dev
    ```
    通过上面的代码就可以把dev分支中的文件提交到了远程仓库，打开GitHub，找到自己创建的movie仓库，就能看到两个分支master和dev。