import React, { useEffect, useState , useRef} from 'react';
import Header from './Header';
import Tables from './Tables';
import Bubbles from './Bubbles';
import './Popup.css'
import Table from 'react-bootstrap/Table';


const Popup = ({favorites, setFavorites, add_fav, del_fav}) => {




  //   {
  //     "name": "ADANIPORTS",
  //     "price": 1074.4,
  //     "hourly_change": -0.15,
  //     "daily_change": -0.82,
  //     "weekly_change": -0.99,
  //     "monthly_change": -4.83,
  //     "yearly_change": -19.37,
  //     "market_cap": 2320854417408,
  //     "volume_24h": 1015584
  //   },
  //   {
  //     "name": "APOLLOHOSP",
  //     "price": 6256.1,
  //     "hourly_change": 0.21,
  //     "daily_change": -0.97,
  //     "weekly_change": -1.89,
  //     "monthly_change": -6.59,
  //     "yearly_change": -4.7,
  //     "market_cap": 899533307904,
  //     "volume_24h": 267645
  //   },
  //   {
  //     "name": "ASIANPAINT",
  //     "price": 2250,
  //     "hourly_change": 0.14,
  //     "daily_change": -0.34,
  //     "weekly_change": 0.55,
  //     "monthly_change": 0.45,
  //     "yearly_change": -20.67,
  //     "market_cap": 2157115473920,
  //     "volume_24h": 401288
  //   },
  //   {
  //     "name": "AXISBANK",
  //     "price": 1009.2,
  //     "hourly_change": 0.25,
  //     "daily_change": 0.02,
  //     "weekly_change": 1.51,
  //     "monthly_change": -1.71,
  //     "yearly_change": -6.93,
  //     "market_cap": 3124786102272,
  //     "volume_24h": 2288866
  //   },
  //   {
  //     "name": "BAJAJ-AUTO",
  //     "price": 8425,
  //     "hourly_change": 0.3,
  //     "daily_change": -0.95,
  //     "weekly_change": -0.26,
  //     "monthly_change": -1.78,
  //     "yearly_change": 0.54,
  //     "market_cap": 2351449767936,
  //     "volume_24h": 162135
  //   },
  //   {
  //     "name": "BAJFINANCE",
  //     "price": 8370.45,
  //     "hourly_change": 0.04,
  //     "daily_change": -0.31,
  //     "weekly_change": -1.13,
  //     "monthly_change": 16.62,
  //     "yearly_change": 26.63,
  //     "market_cap": 5179467366400,
  //     "volume_24h": 208460
  //   },
  //   {
  //     "name": "BAJAJFINSV",
  //     "price": 1858.45,
  //     "hourly_change": -0.3,
  //     "daily_change": -1.11,
  //     "weekly_change": -1.86,
  //     "monthly_change": 11.17,
  //     "yearly_change": 15.2,
  //     "market_cap": 2963893125120,
  //     "volume_24h": 701617
  //   },
  //   {
  //     "name": "BHARTIARTL",
  //     "price": 1608.05,
  //     "hourly_change": 0.25,
  //     "daily_change": -1.9,
  //     "weekly_change": -3.65,
  //     "monthly_change": 0.5,
  //     "yearly_change": 45.67,
  //     "market_cap": 9619435945984,
  //     "volume_24h": 2332639
  //   },
  //   {
  //     "name": "BPCL",
  //     "price": 251.35,
  //     "hourly_change": -0.28,
  //     "daily_change": 0.02,
  //     "weekly_change": -0.55,
  //     "monthly_change": -4,
  //     "yearly_change": -15.64,
  //     "market_cap": 1091784867840,
  //     "volume_24h": 4399897
  //   },
  //   {
  //     "name": "BRITANNIA",
  //     "price": 4792.35,
  //     "hourly_change": -0.21,
  //     "daily_change": -0.82,
  //     "weekly_change": -2.02,
  //     "monthly_change": -1.44,
  //     "yearly_change": -0.96,
  //     "market_cap": 1154323841024,
  //     "volume_24h": 178775
  //   },
  //   {
  //     "name": "CIPLA",
  //     "price": 1474.95,
  //     "hourly_change": -0.31,
  //     "daily_change": -0.05,
  //     "weekly_change": -0.48,
  //     "monthly_change": 1.92,
  //     "yearly_change": 1.2,
  //     "market_cap": 1191191642112,
  //     "volume_24h": 822313
  //   },
  //   {
  //     "name": "COALINDIA",
  //     "price": 365.6,
  //     "hourly_change": 0.41,
  //     "daily_change": -1.18,
  //     "weekly_change": 1.25,
  //     "monthly_change": -0.96,
  //     "yearly_change": -12.16,
  //     "market_cap": 2253094125568,
  //     "volume_24h": 3127203
  //   },
  //   {
  //     "name": "DIVISLAB",
  //     "price": 5709.05,
  //     "hourly_change": -0.13,
  //     "daily_change": -0.83,
  //     "weekly_change": -2.24,
  //     "monthly_change": -2.86,
  //     "yearly_change": 60.57,
  //     "market_cap": 1515575705600,
  //     "volume_24h": 172729
  //   },
  //   {
  //     "name": "DRREDDY",
  //     "price": 1166.95,
  //     "hourly_change": -0.01,
  //     "daily_change": 1.35,
  //     "weekly_change": -2.51,
  //     "monthly_change": -12.72,
  //     "yearly_change": -6.63,
  //     "market_cap": 972361039872,
  //     "volume_24h": 1467032
  //   },
  //   {
  //     "name": "EICHERMOT",
  //     "price": 5043.15,
  //     "hourly_change": 0.59,
  //     "daily_change": 1.63,
  //     "weekly_change": 6.86,
  //     "monthly_change": 0.27,
  //     "yearly_change": 28.99,
  //     "market_cap": 1382442598400,
  //     "volume_24h": 241195
  //   },
  //   {
  //     "name": "GRASIM",
  //     "price": 2400,
  //     "hourly_change": 0.06,
  //     "daily_change": -1.28,
  //     "weekly_change": -2.57,
  //     "monthly_change": 3.87,
  //     "yearly_change": 10.17,
  //     "market_cap": 1613318455296,
  //     "volume_24h": 376857
  //   },
  //   {
  //     "name": "HCLTECH",
  //     "price": 1645.8,
  //     "hourly_change": -0.16,
  //     "daily_change": -3.23,
  //     "weekly_change": -4.62,
  //     "monthly_change": -8.64,
  //     "yearly_change": 3.23,
  //     "market_cap": 4460291031040,
  //     "volume_24h": 3053403
  //   },
  //   {
  //     "name": "HDFCBANK",
  //     "price": 1674,
  //     "hourly_change": 0.28,
  //     "daily_change": -1.09,
  //     "weekly_change": -2.85,
  //     "monthly_change": 1.66,
  //     "yearly_change": 19.3,
  //     "market_cap": 12807238057984,
  //     "volume_24h": 5507164
  //   },
  //   {
  //     "name": "HDFCLIFE",
  //     "price": 618.35,
  //     "hourly_change": 0.19,
  //     "daily_change": -0.72,
  //     "weekly_change": -0.1,
  //     "monthly_change": 4.06,
  //     "yearly_change": 7.65,
  //     "market_cap": 1330905481216,
  //     "volume_24h": 610806
  //   },
  //   {
  //     "name": "HEROMOTOCO",
  //     "price": 3858.95,
  //     "hourly_change": 0.14,
  //     "daily_change": 0.16,
  //     "weekly_change": 0.48,
  //     "monthly_change": -3.58,
  //     "yearly_change": -11.37,
  //     "market_cap": 771832479744,
  //     "volume_24h": 133527
  //   },
  //   {
  //     "name": "HINDALCO",
  //     "price": 641.55,
  //     "hourly_change": -0.14,
  //     "daily_change": -1.84,
  //     "weekly_change": 4.92,
  //     "monthly_change": 8.45,
  //     "yearly_change": 27.76,
  //     "market_cap": 1424311582720,
  //     "volume_24h": 3159189
  //   },
  //   {
  //     "name": "HINDUNILVR",
  //     "price": 2236.35,
  //     "hourly_change": -0.25,
  //     "daily_change": -0.24,
  //     "weekly_change": -2.6,
  //     "monthly_change": -5.76,
  //     "yearly_change": -5.7,
  //     "market_cap": 5254506086400,
  //     "volume_24h": 966845
  //   },
  //   {
  //     "name": "ICICIBANK",
  //     "price": 1218.6,
  //     "hourly_change": 0.35,
  //     "daily_change": -1.16,
  //     "weekly_change": -1.97,
  //     "monthly_change": -1.59,
  //     "yearly_change": 16.59,
  //     "market_cap": 8606923096064,
  //     "volume_24h": 6569905
  //   },
  //   {
  //     "name": "INDUSINDBK",
  //     "price": 1028,
  //     "hourly_change": 0,
  //     "daily_change": -1.51,
  //     "weekly_change": 0.38,
  //     "monthly_change": 6.81,
  //     "yearly_change": -29.13,
  //     "market_cap": 800866500608,
  //     "volume_24h": 1927273
  //   },
  //   {
  //     "name": "INFY",
  //     "price": 1756.05,
  //     "hourly_change": -0.41,
  //     "daily_change": -3.25,
  //     "weekly_change": -5.18,
  //     "monthly_change": -9.93,
  //     "yearly_change": 8.5,
  //     "market_cap": 7274525360128,
  //     "volume_24h": 4059725
  //   },
  //   {
  //     "name": "ITC",
  //     "price": 402.45,
  //     "hourly_change": 0.01,
  //     "daily_change": 0.39,
  //     "weekly_change": -0.69,
  //     "monthly_change": -6.53,
  //     "yearly_change": 1.67,
  //     "market_cap": 5035655692288,
  //     "volume_24h": 4589016
  //   },
  //   {
  //     "name": "JSWSTEEL",
  //     "price": 965.25,
  //     "hourly_change": 0.05,
  //     "daily_change": -1.7,
  //     "weekly_change": -1.38,
  //     "monthly_change": 6.77,
  //     "yearly_change": 20.29,
  //     "market_cap": 2355152289792,
  //     "volume_24h": 1130944
  //   },
  //   {
  //     "name": "KOTAKBANK",
  //     "price": 1953.45,
  //     "hourly_change": -0.12,
  //     "daily_change": 0.02,
  //     "weekly_change": -0.5,
  //     "monthly_change": 11.59,
  //     "yearly_change": 14.61,
  //     "market_cap": 3883790499840,
  //     "volume_24h": 999435
  //   },
  //   {
  //     "name": "LT",
  //     "price": 3281.55,
  //     "hourly_change": -0.19,
  //     "daily_change": -1.01,
  //     "weekly_change": 1.91,
  //     "monthly_change": -6.28,
  //     "yearly_change": -4.69,
  //     "market_cap": 4512721928192,
  //     "volume_24h": 934971
  //   },
  //   {
  //     "name": "M&M",
  //     "price": 2712.4,
  //     "hourly_change": 0.49,
  //     "daily_change": 1.61,
  //     "weekly_change": -2.78,
  //     "monthly_change": -8.37,
  //     "yearly_change": 41.58,
  //     "market_cap": 3252655751168,
  //     "volume_24h": 4668848
  //   },
  //   {
  //     "name": "MARUTI",
  //     "price": 12347,
  //     "hourly_change": 0.38,
  //     "daily_change": 0.22,
  //     "weekly_change": -3.41,
  //     "monthly_change": 5.19,
  //     "yearly_change": 8.72,
  //     "market_cap": 3881933996032,
  //     "volume_24h": 249894
  //   },
  //   {
  //     "name": "NESTLEIND",
  //     "price": 2231.8,
  //     "hourly_change": -0.05,
  //     "daily_change": 0.76,
  //     "weekly_change": 0.42,
  //     "monthly_change": 2.11,
  //     "yearly_change": -12.7,
  //     "market_cap": 2151805616128,
  //     "volume_24h": 316143
  //   },
  //   {
  //     "name": "NTPC",
  //     "price": 322.05,
  //     "hourly_change": -0.22,
  //     "daily_change": -1.29,
  //     "weekly_change": 3.49,
  //     "monthly_change": 1,
  //     "yearly_change": -2.51,
  //     "market_cap": 3122812420096,
  //     "volume_24h": 3234605
  //   },
  //   {
  //     "name": "ONGC",
  //     "price": 236,
  //     "hourly_change": -0.02,
  //     "daily_change": -1.63,
  //     "weekly_change": -0.25,
  //     "monthly_change": -6.77,
  //     "yearly_change": -7.91,
  //     "market_cap": 2968950669312,
  //     "volume_24h": 3335083
  //   },
  //   {
  //     "name": "POWERGRID",
  //     "price": 260.85,
  //     "hourly_change": 0.15,
  //     "daily_change": -0.4,
  //     "weekly_change": -2.29,
  //     "monthly_change": -11.64,
  //     "yearly_change": -6.21,
  //     "market_cap": 2426061455360,
  //     "volume_24h": 9983418
  //   },
  //   {
  //     "name": "RELIANCE",
  //     "price": 1218.1,
  //     "hourly_change": 0.12,
  //     "daily_change": -0.82,
  //     "weekly_change": -0.6,
  //     "monthly_change": -2.72,
  //     "yearly_change": -17.82,
  //     "market_cap": 16483816046592,
  //     "volume_24h": 3729512
  //   },
  //   {
  //     "name": "SBILIFE",
  //     "price": 1484.25,
  //     "hourly_change": -0.2,
  //     "daily_change": -0.75,
  //     "weekly_change": 0.6,
  //     "monthly_change": 0.78,
  //     "yearly_change": -4.02,
  //     "market_cap": 1487396667392,
  //     "volume_24h": 687726
  //   },
  //   {
  //     "name": "SBIN",
  //     "price": 717.1,
  //     "hourly_change": -0.09,
  //     "daily_change": -0.68,
  //     "weekly_change": -1.2,
  //     "monthly_change": -4.86,
  //     "yearly_change": -3.92,
  //     "market_cap": 6399844679680,
  //     "volume_24h": 3769332
  //   },
  //   {
  //     "name": "SHREECEM",
  //     "price": 28394.7,
  //     "hourly_change": 0.17,
  //     "daily_change": -0.04,
  //     "weekly_change": 0.12,
  //     "monthly_change": 13.19,
  //     "yearly_change": 9.2,
  //     "market_cap": 1024500629504,
  //     "volume_24h": 6059
  //   },
  //   {
  //     "name": "SUNPHARMA",
  //     "price": 1638.45,
  //     "hourly_change": -0.19,
  //     "daily_change": -0.32,
  //     "weekly_change": -3.71,
  //     "monthly_change": -6.18,
  //     "yearly_change": 6.2,
  //     "market_cap": 3931182202880,
  //     "volume_24h": 1300926
  //   },
  //   {
  //     "name": "TATACONSUM",
  //     "price": 1010,
  //     "hourly_change": 0.18,
  //     "daily_change": 0.6,
  //     "weekly_change": -1.65,
  //     "monthly_change": 5.7,
  //     "yearly_change": -13.6,
  //     "market_cap": 999384875008,
  //     "volume_24h": 578427
  //   },
  //   {
  //     "name": "TATAMOTORS",
  //     "price": 670.4,
  //     "hourly_change": -0.14,
  //     "daily_change": -0.42,
  //     "weekly_change": -1.76,
  //     "monthly_change": -12.21,
  //     "yearly_change": -28.23,
  //     "market_cap": 2467869753344,
  //     "volume_24h": 5234776
  //   },
  //   {
  //     "name": "TATASTEEL",
  //     "price": 138.97,
  //     "hourly_change": -0.52,
  //     "daily_change": -1.27,
  //     "weekly_change": 3.29,
  //     "monthly_change": 9.83,
  //     "yearly_change": -0.62,
  //     "market_cap": 1733206081536,
  //     "volume_24h": 14567568
  //   },
  //   {
  //     "name": "TCS",
  //     "price": 3700,
  //     "hourly_change": 0.1,
  //     "daily_change": -2.27,
  //     "weekly_change": -4.47,
  //     "monthly_change": -12.73,
  //     "yearly_change": -6.18,
  //     "market_cap": 13386932813824,
  //     "volume_24h": 1325324
  //   },
  //   {
  //     "name": "TECHM",
  //     "price": 1627.9,
  //     "hourly_change": 0.21,
  //     "daily_change": -1.31,
  //     "weekly_change": -4.52,
  //     "monthly_change": -2.87,
  //     "yearly_change": 28.86,
  //     "market_cap": 1440175489024,
  //     "volume_24h": 555005
  //   },
  //   {
  //     "name": "TITAN",
  //     "price": 3179.65,
  //     "hourly_change": 0.16,
  //     "daily_change": -0.01,
  //     "weekly_change": -1.31,
  //     "monthly_change": -4.3,
  //     "yearly_change": -11.94,
  //     "market_cap": 2820492492800,
  //     "volume_24h": 224540
  //   },
  //   {
  //     "name": "ULTRACEMCO",
  //     "price": 11126.05,
  //     "hourly_change": -0.17,
  //     "daily_change": -0.28,
  //     "weekly_change": -1.62,
  //     "monthly_change": 5.74,
  //     "yearly_change": 12.71,
  //     "market_cap": 3206349586432,
  //     "volume_24h": 92280
  //   },
  //   {
  //     "name": "WIPRO",
  //     "price": 294.95,
  //     "hourly_change": -0.25,
  //     "daily_change": -3.72,
  //     "weekly_change": -5.53,
  //     "monthly_change": 2.72,
  //     "yearly_change": 12.9,
  //     "market_cap": 3085059227648,
  //     "volume_24h": 7220970
  //   }
  // ]


  // const [nifty50Data, setNifty50Data] = useState(null);

  const [nifty50Data, setNifty50Data] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/stocks');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNifty50Data(data);
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };


    fetchData();
    const intervalId = setInterval(fetchData, 60 * 60000); // Fetch every 60 seconds (60000ms)

    return () => clearInterval(intervalId);
  }, []);

  const [showinfo, setShowinfo] = useState({ state: false, company: '' });
  const [details, setDetails] = useState({
    name: '',
    price: '',
    hourly_change: '',
    daily_change: '',
    weekly_change: '',
    monthly_change: '',
    yearly_change: '',
    market_cap: '',
    volume_24h: '',
  });

  useEffect(() => {
    if (showinfo.state && showinfo.company) {
      const comp = nifty50Data.find((stock) => stock.name === showinfo.company);
      if (comp) {
        setDetails({
          name: comp.name,
          price: comp.price,
          hourly_change: comp.hourly_change,
          daily_change: comp.daily_change,
          weekly_change: comp.weekly_change,
          monthly_change: comp.monthly_change,
          yearly_change: comp.yearly_change,
          market_cap: comp.market_cap,
          volume_24h: comp.volume_24h,
        });
      } else {
        // Handle the case where the company is not found
        setDetails({
          name: 'Company Not Found',
          price: '',
          hourly_change: '',
          daily_change: '',
          weekly_change: '',
          monthly_change: '',
          yearly_change: '',
          market_cap: '',
          volume_24h: '',
        });
      }
    }
  }, [showinfo, nifty50Data]);
  
  const[showfav,setShowfav] = useState(false);



  return (
    <div>
      <Header favorites={favorites} setFavorites={setFavorites} add_fav={add_fav} showinfo={showinfo} setShowinfo={setShowinfo} showfav = {showfav} setShowfav = {setShowfav}/>
      <Bubbles showinfo={showinfo} setShowinfo={setShowinfo} nifty50Data = {nifty50Data} setNifty50Data= {setNifty50Data} loading ={loading} error={error} favorites = {favorites} showfav = {showfav} setShowfav = {setShowfav}/>
      <Tables showinfo={showinfo} setShowinfo={setShowinfo} nifty50Data = {nifty50Data} setNifty50Data= {setNifty50Data} loading ={loading} error={error} favorites = {favorites} setFavorites = {setFavorites} add_fav = {add_fav} del_fav = {del_fav}/>
      <div className={`stockInfo ${showinfo.state ? 'showstockinfo' : 'hidestockinfo'}`}>
        <button className='btn close' onClick={() => setShowinfo({state: false, company: ''})}>&times;</button>
        <h2 >{details.name}
        
        </h2>
        {favorites.includes(details.name) ? 
            <button  className='popfavadded' onClick={() => del_fav(details.name)} title='Remove'><i class="fa-solid fa-heart"></i></button>
        : 
            <button  className='popaddbtn' onClick={() => add_fav(details.name)} title='Add to Favorites'>+</button>
        }
        <Table hover className='table pt' responsive='md' id='table'>
                <tbody>
                    <tr>
                      <td style={{width:"50%", fontWeight:"bold", textAlign:"left"}}>Current Price :</td>
                      <td style={{width:"50%"}}>{details.price}</td>
                    </tr>
                    <tr>
                      <td style={{width:"50%", fontWeight:"bold", textAlign:"left"}}>Hourly Rate change :</td>
                      <td style={{width:"50%"}}>{details.hourly_change}%</td>
                    </tr>
                    <tr>
                      <td style={{width:"50%", fontWeight:"bold", textAlign:"left"}}>Daily Rate change :</td>
                      <td style={{width:"50%"}}>{details.daily_change}%</td>
                    </tr>
                    <tr>
                      <td style={{width:"50%", fontWeight:"bold", textAlign:"left"}}>Weekly Rate change :</td>
                      <td style={{width:"50%"}}>{details.weekly_change}%</td>
                    </tr>
                    <tr>
                      <td style={{width:"50%", fontWeight:"bold", textAlign:"left"}}>Monthly Rate change :</td>
                      <td style={{width:"50%"}}>{details.monthly_change}%</td>
                    </tr>
                    <tr>
                      <td style={{width:"50%", fontWeight:"bold", textAlign:"left"}}>Yearly Rate change :</td>
                      <td style={{width:"50%"}}>{details.yearly_change}%</td>
                    </tr>
                    <tr>
                      <td style={{width:"50%", fontWeight:"bold", textAlign:"left"}}>MArket Cap :</td>
                      <td style={{width:"50%"}}>{Math.floor(details.market_cap/10000000)}Cr</td>
                    </tr>
                    <tr>
                      <td style={{width:"50%", fontWeight:"bold", textAlign:"left"}}>24 Hour Volume :</td>
                      <td style={{width:"50%"}}>{details.volume_24h}</td>
                    </tr>
                </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Popup;