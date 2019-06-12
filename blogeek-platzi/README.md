https://platzi.com/clases/1472-firebase-cloud/16634-probando-y-desplegando-las-cloud-functions/

## Tips

- Create new functions project `firebase init functions`
- Deploy only the web `firebase deploy --except functions`
<!-- - Deploy `functions`, go to functions folder, run `firebase use --add` to add the functions to our project and then run `firebase deploy --only functions` -->
- Deploy only one function `firebase --only functions:NAME_OF_THE_FUNCTION`
- Delete one function `firebase functions:delete NAME_OF_THE_FUNCTION`
- Watch log `firebase functions:log`