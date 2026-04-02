# app-nf
This is a prototype app based on native federation V3


## PreInstall

```sh
nvm use 22.19.0
```

## Run

### shell

In docker
```sh
docker compose up --build 
```

http://localhost:4200/

![shell-in-prod-mode](./screenshoots/shell-in-prod-mode.png)



### remote-app

preinstall
```sh
npm i
```

single (dev mode)
```sh
npm run start
```

http://localhost:4202/

![single-remote-app](./screenshoots/single-remote-app.png)

OR

in shell (dev mode)
```sh
npm i
npm run start:proxy
```

![remote-in-shell](./screenshoots/remote-in-shell.png)


http://localhost:4203/
