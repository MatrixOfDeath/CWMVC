<?php

namespace Service;
use \Models\Article as Article;

class data {
    public $result;
    public $author;
    //public $Article;

    public function __construct(){
        //$this->Article = new Article();
    }

    private function setResult($resultat, $errorMsg=null){
        $this->result = new \stdClass();
        if ($resultat) {
            $this->result->id = $errorMsg;
            $this->result->response = $resultat;
            $this->result->author = $this->author;
            return $this->result;
        }else{
            return $errorMsg;
        }
    }

	function get_data($params){
        $Article = new Article();
        return $Article->listArticles();
    }

	function post_data($data){
	    if(!empty($data['titre']) && !empty($data['content'])){
            $Article = new Article();
            $Article->author = $_SESSION['user']['nom'];
            if (!empty($data['titre'])) {
                $Article->titre = $data['titre'];
            }
            if(!empty($data['content'])){
                $Article->content = $data['content'];
            }
            $this->author = $_SESSION['user']['nom'];
            $Article->save();
            return $this->setResult(true, $Article->id);
        }else{
            return $this->setResult(false, "Erreur");
        }

    }

	function put_data($data){
       if ($data['id']) {
            $Article = new Article();

            if($Article = $Article->FindByID($data['id'])){
               //var_dump($Article);// = $Article->FindByID($data['id'])
                if (!empty($data['titre'])) {
                    $Article->titre = $data['titre'];
                }
                if(!empty($data['content'])){
                    $Article->content = $data['content'];
                }
                $Article->author = $_SESSION['user']['nom'];
                $this->author = $Article->author;
                $Article->update();
            }else{
                return $this->setResult(false, "Erreur");
            }
        }
        return $this->setResult(true, null);
    }
	function delete_data($data){
        if(empty($data["id"])){
            return $this->setResult(false, "Erreur introuvable en BDD");
        }

        $Article = new Article();
        if ($Article = $Article->FindById($data['id'])) {
            $Article->delete();
            return $this->setResult(true, null);
        }else{
            return $this->setResult(false, null);

        }
    }
}