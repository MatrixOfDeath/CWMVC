<?php 
namespace Models;
use \_Core\Database as Database;

class Article
{
	public $id 		    = -1;
	public $titre 	    = null;
	public $content	    = null;
	public $author	    = null;
	public $last_edit   = null;

	function __Construct($arg = false)
	{
		if($arg){
			foreach ($this as $key => $value) {
				if (isset($arg[$key]))
				{
				    $this->$key = $arg[$key];
				}
			}
		}
	}

	function save(){
		if ($this->id == -1 )
		{
			$this->id = Database::instance()->insert(__CLASS__,$this);
		} else
		{
			Database::instance()->update(__CLASS__,$this);
		}
	}

	public function delete(){
		Database::instance()->delete(__CLASS__,$this);
	}

	public function update($data=null){
	    $this->last_edit = time();
        Database::instance()->update(__CLASS__, $this);
    }

	public static function FindByID($id)
	{
		return Database::instance()->select(__CLASS__,["id"=>$id]);
	}

    public function listArticles(){
        return Database::instance()->selectAllRows(__CLASS__, $this);

    }

    public function getId(){
        return $this->id;
    }

	

}