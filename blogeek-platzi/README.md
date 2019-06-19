https://platzi.com/clases/1472-firebase-cloud/16646-creacion-de-las-cloud-functions-que-se-dispare-cua/

## Tips

- Create new functions project `firebase init functions`
- Deploy only the web `firebase deploy --except functions`
<!-- - Deploy `functions`, go to functions folder, run `firebase use --add` to add the functions to our project and then run `firebase deploy --only functions` -->
- Deploy only one function `firebase --only functions:NAME_OF_THE_FUNCTION`
- Delete one function `firebase functions:delete NAME_OF_THE_FUNCTION`
- Watch log `firebase functions:log`
- Get config variables `firebase functions:config:get`
- Define config variables `firebase functions:config:set configuration.email="EMAIL_HERE" configuration.password="PASSWORD_HERE"`
- Variables in local `firebase functions:config:get | ac .runtimeconfig.json`
- Run environment in local `firebase functions:shell`
