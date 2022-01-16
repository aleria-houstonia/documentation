import React, { useContext, useState } from "react";
import Logo from "../../assets/img/logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { topicContext } from "../../Contexts/TopicContext";

const Header = () => {
    const { search, searchData } = useContext(topicContext);
    const [searchValue, setSearchValue] = useState("");
    const handleValue = (e) => {
        setSearchValue(e.target.value);
        search(searchValue);
    };
    return (
        <header>
            <div className="container">
                <div className="navbar">
                    <div className="navbar__logo">
                        {" "}
                        <Link to="/">Documentation</Link>
                    </div>
                    <ul className="navbar__right">
                        <li>
                            <Link to="/">Главная</Link>
                        </li>
                        <li>Документация</li>
                        <li>
                            <Link to="/add">Добавить</Link>
                        </li>
                        <li className="search-item">
                            <input
                                className="inp-search"
                                placeholder="Поиск"
                                onChange={handleValue}
                            />
                            <div className="search-result">
                                {searchData.map((item) => (
                                    <Link
                                        key={item.id}
                                        to={`/details/${item.id}`}
                                    >
                                        <div key={item.id}>{item.title}</div>
                                    </Link>
                                ))}
                            </div>
                        </li>
                        <li>GitHub</li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
