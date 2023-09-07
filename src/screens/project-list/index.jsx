import React from "react"
import { useState, useEffect } from "react"
import { SearchPanel } from "./searchPanel"
import { List } from "./list"
import { cleanObject, useDebounce, useMount } from "utils"
import qs from "qs"

const apiUrl=process.env.REACT_APP_API_URL
export const  ProjectListScreen = ()=> {
    const [param,setParam]=useState({
        name:"",
        personId:""
    })
    const [users,setUsers]=useState([])
    const [list,setList]=useState([])
    const debounceParam=useDebounce(param,1000)
    useEffect(()=>{
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async response=> {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [debounceParam])
    useEffect(()=>{
        fetch(`${apiUrl}/users`).then(async response=> {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    }, [])
    return <div>
        <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
        <List users={users} list={list}></List>
    </div>
}