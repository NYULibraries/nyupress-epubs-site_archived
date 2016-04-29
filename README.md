NYU Press ePubs - ARCHIVED
==========================

---

This is an archive of the original NYU Press ePubs site that was later split into
two NYU Press sites: [Open Access Books](http://openaccessbooks.nyupress.org/) and
[Connected Youth](http://connectedyouth.nyupress.org/).  It is not longer in use
but it contains archived development branches that we might want to refer to later.

This repo is superseded by [dlts-open-access-books](https://github.com/NYULibraries/dlts-open-access-books).
See [NYUP-144](https://jira.nyu.edu/browse/NYUP-144) for details.

For the reason why this repo wasn't simply renamed "dlts-open-access-books", see
[this comment in Jira issue NYUP-140](https://jira.nyu.edu/browse/NYUP-140?focusedCommentId=61555&page=com.atlassian.jira.plugin.system.issuetabpanels:comment-tabpanel#comment-61555).

---

A site for viewing and displaying epub books.

### Get the project
`git clone git@github.com:NYULibraries/nyupress-epubs-site.git nyupress-epubs-site`

### Use this branch
`cd nyupress-epubs-site`
`git checkout gruntTaskToBuild`

### Install dependencies 
`npm install`

### Change to match your environment and save.
`cp source/json/default.conf.json source/json/conf.json`

### Build

`grunt`
