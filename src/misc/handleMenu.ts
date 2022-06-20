function handleMenu (size:string):void {
    const menu:HTMLDivElement|null = document.querySelector('.menu')
    if(menu)
      menu.style.left = size
}

export default handleMenu