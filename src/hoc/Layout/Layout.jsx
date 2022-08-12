import React, { useState } from "react";
import classes from "./Layout.module.scss";
import { Sidebar, Navbar, Footer, Settings } from "../../components";
import { useGetGroupsQuery } from "../../services/groupApi";

const Layout = (props) => {
  const { data: students, isLoading } = useGetGroupsQuery();
  const [filteredData, setFilteredData] = useState([]);
  const [bgSearch, setBgSearch] = useState(false)

  const [state, setState] = useState({
    isShow: false,
  });

  const [search, setSearch] = useState("")


  return (
    <div className={classes.Layout}>
      <div className={classes.layoutTop}>
        <Navbar
          dropHandler={dropHandler}
          isShow={state.isShow}
          onChangeHandler={onChangeHandler}
          search={search}
          setSearch={setSearch}
          filteredData={filteredData}
          bgSearch={bgSearch}
          setBgSearch={setBgSearch}
          isLoading={isLoading}
        />
      </div>
      <div className={classes.layoutBottom}>
        <Sidebar />
        <main>
          <Settings />
          <div className={classes.mainContent}>{props.children}</div>
          <Footer />
        </main>
      </div>
    </div>
  );

  function dropHandler() {
    setState({
      isShow: !state.isShow,
    });
  }

  function onChangeHandler(e) {
    setBgSearch(true)
    setSearch(e.target.value)
    if (e.target.value === "") {
      setBgSearch(false)
    }
    const searchWord = e.target.value;
    const newFilter = students?.Students.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }

  }
};

export default Layout;
