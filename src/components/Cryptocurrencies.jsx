import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { Loader } from '../components'

import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({simplified}) => {

    const count = simplified ? 10 : 100
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count)

    const [cryptos, setcryptos] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((coin) =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setcryptos(filteredData)
    }, [cryptosList, searchTerm])

    if(isFetching) return <Loader />

    return (
        <>  
            { !simplified && (
                <div className="search-crypto">
                    <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
            )}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.key}>
                        <Link to={`/crypto/${currency.id}`}>
                            <Card 
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className="crypto-image" alt="crypto-icon" src={currency.iconUrl} />}
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies