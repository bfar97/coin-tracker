import React from 'react'
import HTMLReactParser from 'html-react-parser'
import { Row, Col, Collapse, Typography, Avatar} from 'antd'
import millify from 'millify'
import { Loader } from '../components'

import { useGetExchangesQuery } from '../services/cryptoApi'

const { Panel } = Collapse

const { Title } = Typography

const Exchanges = () => {

    const {data, isFetching } = useGetExchangesQuery()

    if(isFetching) return <Loader />
    
    const exchanges = data?.data?.exchanges
    console.log(exchanges)
    return (  
        <>  
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Market Share</Col>
            </Row>
            <Collapse>
                {exchanges.map((exchange, i) => (
                    <Panel showArrow={false} key={exchange.id} header={
                        <Row>
                            <Col span={6}>
                                <Row className="coin-stats-name">   
                                    <Col>{i+1}.</Col>
                                    <Col><Avatar src={exchange.iconUrl}/></Col>
                                    <Col><Title level={5}>{exchange.name}</Title></Col>
                                </Row>
                            </Col>
                            <Col span={6}>${millify(exchange.volume)}</Col>
                            <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                            <Col span={6}>{millify(exchange.marketShare)}%</Col>
                        </Row>
                    }>
                        {(typeof(exchange.description)=="string" ? HTMLReactParser(exchange.description) : "Not available")}
                    </Panel>
                ))}
            </Collapse>
        </>
    )
}

export default Exchanges
