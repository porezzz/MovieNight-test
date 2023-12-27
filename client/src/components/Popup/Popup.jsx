import React, { useEffect, useRef } from 'react'
import classes from './Popup.module.css'


const Popup = (title, description, status) => {
    console.log(title, description, status)
    const div = document.createElement('div')
    div.classList.add(classes.cont)
    const h1 = document.createElement('h1')
    h1.textContent = title
    if(status == 'ok'){
        h1.classList.add(classes.titleOk)
        div.classList.add(classes.contOk)
    } else if(status == 'nook'){
        h1.classList.add(classes.titleNoOk)
        div.classList.add(classes.contNoOk)
    }
    div.appendChild(h1)
    const p = document.createElement('p')
    p.textContent = description
    p.classList.add(classes.desc)
    div.appendChild(p)
    document.body.appendChild(div)
    setTimeout(() => {
        div.classList.add(classes.fadeOut)
    }, 1000);
    setTimeout(() => {
        div.remove()
    }, 2000);

}

export default Popup