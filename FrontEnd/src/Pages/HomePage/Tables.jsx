import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import './Tables.css';
import api from '../../api/axios';
import { useAuth } from "../AuthContext";
import { ToastContainer, toast } from 'react-toastify';


const Tables = ({showinfo, setShowinfo, nifty50Data, setNifty50Data, loading, error, favorites, setFavorites, add_fav, del_fav}) => {






    const [sortedData, setSortedData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'market_cap', direction: 'asc' });

    useEffect(() => {
        if (nifty50Data) {
          setSortedData([...nifty50Data]);
        }
      }, [nifty50Data]);
      

    const sortTable = (key) => {
        if (!sortedData) return;

        let newDirection = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            newDirection = 'desc';
        }

        const sorted = [...sortedData].sort((a, b) => {
            const aValue = a[key] ?? 0;
            const bValue = b[key] ?? 0;
          
            if (typeof aValue === 'number') {
              return newDirection === 'asc' ? aValue - bValue : bValue - aValue;
            } else {
              return newDirection === 'asc'
                ? aValue.toString().localeCompare(bValue.toString())
                : bValue.toString().localeCompare(aValue.toString());
            }
          });
          

        setSortConfig({ key, direction: newDirection });
        setSortedData(sorted);
    };

  

    
    



    return (
        <div id = 'tbl'>
            <Table hover className='table' responsive='md' id='table'>
                <thead>
                    <tr>
                        <th onClick={() => sortTable('id')} style={{ cursor: "pointer" }}>#</th>
                        <th></th>
                        <th onClick={() => sortTable('name')} style={{ cursor: "pointer" }}>Name ⬍</th>
                        <th onClick={() => sortTable('price')} style={{ cursor: "pointer", textAlign: "right" }}>Price ⬍</th>
                        <th onClick={() => sortTable('market_cap')} style={{ cursor: "pointer", textAlign: "right" }}>Market Cap ⬍</th>
                        <th onClick={() => sortTable('volume_24h')} style={{ cursor: "pointer", textAlign: "right" }}>24h Volume ⬍</th>
                        <th onClick={() => sortTable('hourly_change')} style={{ cursor: "pointer", textAlign: "center" }}>Hour ⬍</th>
                        <th onClick={() => sortTable('daily_change')} style={{ cursor: "pointer", textAlign: "center" }}>Day ⬍</th>
                        <th onClick={() => sortTable('weekly_change')} style={{ cursor: "pointer", textAlign: "center" }}>Week ⬍</th>
                        <th onClick={() => sortTable('monthly_change')} style={{ cursor: "pointer", textAlign: "center" }}>Month ⬍</th>
                        <th onClick={() => sortTable('yearly_change')} style={{ cursor: "pointer", textAlign: "center" }}>Year ⬍</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((ticker, i) => (
                        <tr key={i}>
                            <td style={{ width: "1%" }}>{i + 1}</td>
                            <td style={{ textAlign: "center" }}>

                                {favorites.includes(ticker.name) ? 
                                    <button className='favadded' onClick={() => del_fav(ticker.name)} title='Remove'><i class="fa-solid fa-heart"></i></button>
                                : 
                                    <button className='addbtn' onClick={() => add_fav(ticker.name)} title='Add to Favorites'>+</button>
                                }

                                </td>
                            <td><a style={{cursor:"pointer"}} onClick={() => {setShowinfo((prevState) => ({state: !prevState.state, company: (prevState.state) ? '' : ticker.name}))}}>{ticker.name}</a></td>
                            <td style={{ textAlign: "right" }}>{ticker.price}</td>
                            <td style={{ textAlign: "right" }}>{ticker.market_cap}</td>
                            <td style={{ textAlign: "right" }}>{ticker.volume_24h}</td>
                            <td className={`${(ticker.hourly_change > 0) ? "positive" : "negative"}`}>{ticker.hourly_change}%</td>
                            <td className={`${(ticker.daily_change > 0) ? "positive" : "negative"}`}>{ticker.daily_change}%</td>
                            <td className={`${(ticker.weekly_change > 0) ? "positive" : "negative"}`}>{ticker.weekly_change}%</td>
                            <td className={`${(ticker.monthly_change > 0) ? "positive" : "negative"}`}>{ticker.monthly_change}%</td>
                            <td className={`${(ticker.yearly_change > 0) ? "positive" : "negative"}`}>{ticker.yearly_change}%</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
        </div>
    );
}


export default Tables;