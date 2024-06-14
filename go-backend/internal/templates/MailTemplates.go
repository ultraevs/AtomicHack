package templates

func RegisterTemplate() string {
	return `
	<!DOCTYPE html>
	<html>
	<head>
	    <style>
	        body {
	            font-family: Arial, sans-serif;
	            margin: 40px;
	            background-color: #f4f4f9;
	            color: #333;
	        }
	        .container {
	            background-color: #fff;
	            border: 1px solid #dedede;
	            border-radius: 5px;
	            padding: 20px;
	            margin-top: 20px;
	        }
	        h1 {
	            color: #4A90E2;
	        }
	        a {
	            color: #4A90E2;
	            text-decoration: none;
	            border-bottom: 1px solid #4A90E2;
	            transition: color 0.5s, border-bottom-color 0.5s;
	        }
	        a:hover, a:focus {
	            color: #d35400;
	            border-bottom-color: #d35400;
	        }
	        footer {
	            margin-top: 20px;
	            font-size: 12px;
	            text-align: center;
	            color: #999;
	        }
	    </style>
	</head>
	<body>
	    <div class="container">
	        <h1>Уважаемый пользователь!</h1>
	        <p>Вы получили это письмо, потому что на сайте <a href="https://atomic.shmyaks.ru/">AtomicHack</a> был зарегистрирован аккаунт с вашим email.</p>
	        <p>Если это были не вы, обратитесь в поддержку нашего сайта: <a href="mailto:smyakneksbimisis@gmail.com">smyakneksbimisis@gmail.com</a></p>
	    </div>
	    <footer>
	        © 2024 AtomicHack. Все права защищены.
	    </footer>
	</body>
	</html>
	`
}

func PasswordResetTemplate(token string) string {
	link := "https://atomic.shmyaks.ru/newpass?token=" + token
	return `
	<!DOCTYPE html>
	<html>
	<head>
	    <style>
	        body {
	            font-family: Arial, sans-serif;
	            margin: 40px;
	            background-color: #f4f4f9;
	            color: #333;
	        }
	        .container {
	            background-color: #fff;
	            border: 1px solid #dedede;
	            border-radius: 5px;
	            padding: 20px;
	            margin-top: 20px;
	        }
	        h1 {
	            color: #4A90E2;
	        }
	        a {
	            color: #4A90E2;
	            text-decoration: none;
	            border-bottom: 1px solid #4A90E2;
	            transition: color 0.5s, border-bottom-color 0.5s;
	        }
	        a:hover, a:focus {
	            color: #d35400;
	            border-bottom-color: #d35400;
	        }
	        footer {
	            margin-top: 20px;
	            font-size: 12px;
	            text-align: center;
	            color: #999;
	        }
	    </style>
	</head>
	<body>
	    <div class="container">
	        <h1>Здравствуйте, вы сделали запрос на восстановление пароля.</h1>
        	<p>Чтобы сменить пароль, перейдите по следующей ссылке:</p>
        	<a href="` + link + `">Восстановить пароль</a>
	    </div>
	    <footer>
	        © 2024 AtomicHack. Все права защищены.
	    </footer>
	</body>
	</html>
	`
}

func NewPasswordTemplate() string {
	return `
	<!DOCTYPE html>
	<html>
	<head>
	    <style>
	        body {
	            font-family: Arial, sans-serif;
	            margin: 40px;
	            background-color: #f4f4f9;
	            color: #333;
	        }
	        .container {
	            background-color: #fff;
	            border: 1px solid #dedede;
	            border-radius: 5px;
	            padding: 20px;
	            margin-top: 20px;
	        }
	        h1 {
	            color: #4A90E2;
	        }
	        a {
	            color: #4A90E2;
	            text-decoration: none;
	            border-bottom: 1px solid #4A90E2;
	            transition: color 0.5s, border-bottom-color 0.5s;
	        }
	        a:hover, a:focus {
	            color: #d35400;
	            border-bottom-color: #d35400;
	        }
	        footer {
	            margin-top: 20px;
	            font-size: 12px;
	            text-align: center;
	            color: #999;
	        }
	    </style>
	</head>
	<body>
	    <div class="container">
			<h1>Здравствуйте, пароль на вашем аккануте был изменен.</h1>
			<p>Если это были не вы - обратитесь в поддержку нашего сайта: smyakneksbimisis@gmail.com</p>
	    </div>
	    <footer>
	        © 2024 AtomicHack. Все права защищены.
	    </footer>
	</body>
	</html>
	`
}
