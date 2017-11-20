<?php

namespace Controllers;

class Article
{
    public static function manage_articles(){
        $Article = new \Models\Article();
        $listArticles = $Article->listArticles();

        require_once ('_framework/Views/article.phtml');
    }

    public static function restAPI(){
        $API = new \_Core\RestServer();
        $API->loadService('data', new \Service\data());

        require_once ('_framework/Views/restAPI.phtml');
    }

    public static function list_articles(){
        $Article = new \Models\Article();
        $listArticles = $Article->listArticles();

        require_once ('_framework/Views/listarticle.phtml');
    }

	public static function register()
	{
        // Vérif que le post register existe avec le bon submit
        if(isset($_POST['submitRegister'])) {
            $_POST['passwd'] = \Models\Utilisateur::enCrypt($_POST['passwd']);
            $User = new \Models\Utilisateur($_POST);

            $User->save();

            echo "<script>
            alert('Vous êtes bien enregistrer, vous allez être rediriger sur la page de login !');
            window.location.href='../login.phtml';
            </script>";
        }else{
            header("Location: ../register.phtml" );
        }
	}






	
	
	

}