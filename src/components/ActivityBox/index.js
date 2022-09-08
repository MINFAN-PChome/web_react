import React, { useEffect, useState } from 'react';
import ProductInfo from '../ProductInfo';
import Page from '../object/Page';
import HastTag from '../object/HastTag';

import ToolBar from '../ToolBar';
import './activityBox.scss';
import getElementTypeUrl from './../../utils/getElementTypeUrl';

const ActivityBox = ({ activityTag = '主題推薦', newBlock }) => {
  const [newTab, setNewTab] = useState([]);

  const newThemData = [];
  const newHastTagData = [];
  const newProdData = [];
  const [themData, setThemData] = useState([]);
  const [hastTagData, setHastTagData] = useState([]);
  const [prodData, setProdData] = useState([]);

  const page = 6;
  const [pageCurrent, setPageCurrent] = useState(1);
  const [allProdData, setAllProdData] = useState([]);
  const pageAll = prodData.length;
  const newAllData = [];

  useEffect(() => {
    setNewTab(newBlock[0]);
  }, [newBlock]);

  useEffect(() => {
    // api refactored data
    newTab?.Nodes?.forEach((item) => {
      if (item?.Id === 1) {
        newThemData.push(item);
      }
      if (item?.Id >= 2 && item.Id <= 6) {
        newHastTagData.push(item);
      }
      if (item?.Id >= 7) {
        newProdData.push(item);
      }
    });

    setThemData(newThemData);
    setHastTagData(newHastTagData);
    setProdData(newProdData);
  }, [newTab]);
  useEffect(() => {
    const startPage = (pageCurrent - 1) * page;
    setAllProdData(prodData.slice(startPage, startPage + page));
  }, [prodData, pageCurrent]);

  // const renderChange = (pageCurrent) => {
  //   for (let i = (pageCurrent - 1) * page; i < pageCurrent * page && i < prodData.length; i++) {
  //     newAllData.push(prodData[i]);
  //   }
  //   setAllProdData(newAllData);
  // };

  const isActive = useState(false);

  // 回傳
  const handleToolBarClick = (index) => {
    setNewTab(newBlock[index]);
  };

  return (
    <div className='c-activityBox'>
      <div className='c-activityBox__main'>
        {/* <ToolBar newBlock={newBlock} newTab={newTab} setNewTab={setNewTab} /> */}
        <div className='c-toolBar'>
          <ul className='c-toolBarGroup'>
            {newBlock?.map((item, index) => (
              <li
                className={`c-toolBarItem ${
                  isActive && item?.Nodes[0] === newTab?.Nodes[0] ? 'is-active' : ''
                }`}
                onClick={() => {
                  if (index === 0) return;
                  handleToolBarClick(index);
                }}
                key={`${item?.Id}_${index}`}
              >
                <a href='' className='c-toolBarLink'>
                  {item?.Nodes[0]?.Link?.Text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        ;
        {themData?.map((item) => {
          const { Id, Link, Img } = item;
          return (
            <div className='c-activityBox__them' key={Id}>
              <div
                className='c-activityBox__editThem'
                style={{ backgroundColor: `${Link.Background}` }}
              >
                <div className='c-activityBox__info'>
                  <div className='c-activityBox__tag'>
                    <div className='c-activityBox__tagEdit'>{activityTag}</div>
                  </div>
                  <div className='c-activityBox__title'>{Link.Text2}</div>
                  <div className='c-activityBox__hashtagBox'>
                    <ul className='c-activityBox__hashtag'>
                      <HastTag hastTagData={hastTagData} getElementTypeUrl={getElementTypeUrl} />
                    </ul>
                  </div>
                </div>
                <div className='c-activityBox__theme'>
                  <img src={`https://fs-a.ecimg.tw${Img.Src}`} alt={Img.Text} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className='c-activityBox__product'>
        <div className='c-activityBox__info'>
          <div className='c-listInfo__info'>
            <div className='c-listInfo__wrapper'>
              <ul className='c-listInfo__productBox'>
                <ProductInfo
                  allProdData={allProdData}
                  getElementTypeUrl={getElementTypeUrl}
                  // renderChange={renderChange}
                />
              </ul>
            </div>
          </div>
        </div>
        <div className='c-activityBox__page'>
          <Page
            pageCurrent={pageCurrent}
            setPageCurrent={setPageCurrent}
            pageAverage={Math.ceil(pageAll / page)}
            getElementTypeUrl={getElementTypeUrl}
            // renderChange={renderChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityBox;
