import style from "./Home.module.css";
import { CardPerson } from "../User/CardPerson";
import { CardContato, Delete, Update } from "../Contato/CardContatos";

import { BsFillTrash3Fill } from "react-icons/bs";
import { IoPencil, IoSearchOutline, IoAdd } from "react-icons/io5";

import { useEffect, useState } from "react";
import { api, server } from "../../api/axios";


export function Home() {

  let [persons, setPersons] = useState([]);
  let [valor, setValor] = useState('');

  useEffect(() => {
    Load()
  }, []);

  function refreshPage(){
    window.location.reload();
} 

  async function Load() {
    const temp = await server.get("user/");

    Ordenar(temp.data);
  }

  async function Adicionar() {
    event.preventDefault();

    const resultAPI = await api.get("/");

    const user = resultAPI.data.results[0];

    const nomeCompleto = `${user.name.first} ${user.name.last}`;
    const avatar = user.picture.large;
    const cell = user.cell;

    await server.post("user/", {
      name: nomeCompleto,
      avatar: avatar,
      celular: cell,
    });

    Load();
  }

  async function Deletar() {
    event.preventDefault();

    Delete();
    Load();
    refreshPage();
  }

  function Pesquisar() {
    event.preventDefault();  

    if (valor === '') { Load(); }
    else{
      console.log(`Nome procurado: ${valor}`);
      let results = [];

    persons.map((person => {
  
      if(person.name.toLowerCase().includes(valor.toLowerCase())) {
        results.push(person);
        return
      }
    }))

    console.log({results})
    setPersons(results)
    }
  }

  async function Editar() {
    event.preventDefault();

    const resultAPI = await api.get("/");

    const user = resultAPI.data.results[0];

    Update(user);
    Load();
    refreshPage();
  }

  function Ordenar(persons){
    const alfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z' ];
    const tempPerson = [];
    let letraUsadas = [];

    for(let i=0; i<=25; i++){
        persons.map((person => {
            if(person.name[0] === alfabeto[i]) {
                letraUsadas.push(alfabeto[i]);
                tempPerson.push(person);}  
         }
        ));
    }
    setPersons(tempPerson);
      }

  const listStack = [
		{ Tec: "JavaScript", color: "red" },
		{ Tec: "HTML", color: "yellow" },
		{ Tec: "CSS", color: "pink" },
		{ Tec: "Typescript", color: "purple" },
		{ Tec: "React", color: "cyan" },
		{ Tec: "HUAWEII", color: "blue" },
];

  return (
    <div className={style.container}>

      <CardPerson
        cover="https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=350&q=80"
        avatar="https://github.com/MatheusFoliatti.png"
        name="Matheus Foliatti"
        office='Assistente de TI'
        stacks={listStack}/>

      <div className={style.contatos}>
        <div className={style.controles}>
          <form >
            <div className={style.headerContatos}>
              <h1 className={style.title}>Meus contatos</h1>
              <div className={style.buttons}>
                <button className={style.buttom} onClick={Adicionar}> <IoAdd /> </button>
                <button className={style.buttom} onClick={Editar}> <IoPencil /> </button>
                <button className={style.buttom} onClick={Deletar}> <BsFillTrash3Fill /> </button>
              </div>
            </div>
            <div className={style.pesquisa}>
              <button className={style.buttomPesquisa} onClick={Pesquisar}> <IoSearchOutline /> </button>
              <input type='text' name='pesquisa' className={style.inputPesquisa} placeholder="Busque seu contato pelo nome" value={valor} onChange={() => { setValor(event.target.value) }} />
            </div>
          </form>
        </div>
        <div className={style.listaContatos}>
          <div className={style.listaCatalogo}>
            <h1 className={style.letraCatalogo}>A</h1>
            <div className={style.contatoCatalogo}>
              {
                persons.map((person, index) => (
                  <CardContato key={index}
                    avatar={person.avatar}
                    name={person.name}
                    celular={person.celular}
                    id={person.id}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}