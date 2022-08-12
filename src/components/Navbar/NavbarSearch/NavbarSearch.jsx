import React from "react";
import classes from "./NavbarSearch.module.scss";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavbarSearch = (props) => {
  const onHandelBg = () => {
    props.setBgSearch(false);
    props.onChange({
      target: {
        value: "",
      },
    });
  };

  return (
    <>
      <div className={classes.navbarSearch}>
        <input
          type="text"
          placeholder="Qidiruv"
          value={props.search}
          onChange={props.onChange}
          disabled={props.isLoading}
        />
        <span>
          <FaSearch />
        </span>

        {props.filteredData.length !== 0 && (
          <div className={classes.Searched_div}>
            {props.filteredData.slice(0, 15).map((value, key) => {
              return (
                <Link
                  to={`/students/profile/${value._id}`}
                  className={classes.dataItem}
                  href={value.link}
                  key={key}
                  onClick={onHandelBg}
                >
                  <p>{value.name} </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {props.bgSearch ? (
        <div className={classes.bgSearch} onClick={onHandelBg}></div>
      ) : (
        ""
      )}
    </>
  );
};

export default NavbarSearch;
