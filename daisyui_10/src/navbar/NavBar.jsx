import React, { useRef } from 'react'
import keyIcon from '/key.png'
import bellIcon from '/bell.png'
import './NavBar.css';

function NavBar({ title }) {




    const mainMenu = [
        { "name": "Asset", onClick: () => alert('Asset') },
        {
            "name": "Order", list: [
                { name: "Submit", onClick: () => alert('This has been submitted') },
                { name: "-" },
                { name: "Reject", onClick: () => alert('This has been rejected') }
            ]
        },
        {
            "name": "Claims", list: [
                { name: "Submit", onClick: () => alert('Claim submitted') },
                { name: "Reject", onClick: () => alert('Claim rejected') }
            ]
        },
        { "name": "Admin", onClick: () => alert('Admin') },
    ]

    const endMenu = [
        {
            "icon": "key", "list": [
                { name: "Permissions", onClick: () => alert('No permission keys') },
                { name: "-" },
                { name: "Structure", onClick: () => alert('No structure keys') }
            ]
        },
        {
            "icon": "bell", "list": [
                { name: "Alerts", onClick: () => alert('You have no alerts') },
                { name: "Emails", onClick: () => alert('You have no emails') }
            ]
        }
    ]



    const containerRef = useRef(null);

    const closeMenus = function () {
        const divs = containerRef.current.querySelectorAll('details[open]');
        divs.forEach((div) => {
            div.removeAttribute("open");
        });
        document.activeElement.blur();
    }

    const clicker = function (fn) {
        closeMenus();
        setTimeout(fn, 1);
    }

    const menuFocus = function (elem) {
        setTimeout(() => {
            if ((elem.nodeName) == "A")
                elem.parentNode.nextElementSibling.focus();
            else 
                elem.nextElementSibling.focus();
        }, 10)
    }

    const menuNarrow = function () {
        return (

            <>
                <ul className="menu menu-horizontal inline-flex justify-center px-1 text-center sm:hidden">
                    {endMenuWide()}
                </ul >
                {
                    mainMenu.map((item) => {
                        if (typeof item.list === "undefined")
                            return <li>
                                <a onClick={() => clicker(item.onClick)}>{item.name}</a>
                            </li>

                        return <li>
                            <a>{item.name}</a>
                            <ul class="p-2">

                                {item.list.map((subItem) => <li> {
                                    subItem.name == "-" ?
                                        <div className="divider"></div> :
                                        <a onClick={() => clicker(subItem.onClick)}>{subItem.name}</a>}
                                </li>)
                                }

                            </ul></li>
                    })
                }
            </>
        );
    }


    const makeSubMenuItem = (subItem) => {
        return (<> <li>
            {subItem.name == "-" ?
                <div className="divider"></div> :
                <a onClick={() => clicker(subItem.onClick)}>{subItem.name}</a>}
        </li></>)
    }

    const menuWide = function () {
        return (
            mainMenu.map((item) => {
                if (typeof item.list === "undefined")
                    return <li>
                        <a onClick={() => clicker(item.onClick)}>{item.name}</a>
                    </li>

                return <li>
                    <details>
                        <summary onClick={(event) => menuFocus(event.target)}><a>{item.name}</a></summary>
                        <ul tabIndex={0} onBlur={closeMenus} class="p-2">
                            { item.list.map(makeSubMenuItem) }
                        </ul>
                    </details></li>
            })
        );
    }

    const endMenuWide = function () {
        return (
            endMenu.map((item) => {

                return <li>
                    <details>
                        <summary onClick={(event) => menuFocus(event.target)} className="side-icon-summary"><img className="side-icon" src={getIcon(item.icon)}></img></summary>
                        <ul tabIndex={0} onBlur={closeMenus} class="p-2">
                            { item.list.map(makeSubMenuItem) }
                        </ul>
                    </details></li>
            })
        );
    }

    const getIcon = function (icon) {
        switch (icon) {
            case "key": return keyIcon;
            case "bell": return bellIcon;
        }
    }

    return (
    
        <div ref={containerRef} class="navbar bg-base-100 shadow-sm pl-[0px]">

            <div class="navbar-start">
                <div class="dropdown">
                    <div tabindex="0" role="button" class="hamburger btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabindex="0"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        { menuNarrow() }
                    </ul>
                </div>
                <a class="navbar-title btn-ghost text-xl">{title}</a>
            </div>

            <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal px-1">
                    {menuWide()}
                </ul>
            </div>

            <div class="navbar-end">
                <ul class="hidden sm:inline-flex menu menu-horizontal px-1">
                    {endMenuWide()}
                </ul>

                <div>
                    <div><a>newworld/agent001</a></div>
                    <div><a>Log out</a></div>
                </div>
            </div>
        </div>    
    );
}

export default NavBar;
