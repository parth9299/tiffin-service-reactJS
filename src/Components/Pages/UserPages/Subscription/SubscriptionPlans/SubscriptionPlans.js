import React from 'react'
import { assets } from '../../../../../Assets/Images/assets'
import { Link } from 'react-router-dom'
import './SubscriptionPlans.css'

const SubscriptionPlans = () => {
    return (
        <>
            <div className='text'>
                <h2>SUBSCRIPTION PLANS</h2>
            </div>
            <div className="subscriptionplan-plan-container">
                {/* Daily Plan */}
                <div className="subscriptionplan-plan-card daily">
                    <Link to='/dailymenu'><img src={assets.daily_plan} alt="Daily Plan" className="subscriptionplan-plan-image" /></Link>
                    <div className="subscriptionplan-name">Daily</div>
                </div>

                {/* Weekly Plan */}
                <div className="subscriptionplan-plan-card weekly">
                    <Link to='/weeklyplan'><img src={assets.basic_plan} alt="Weekly Plan" className="subscriptionplan-plan-image" /></Link>
                    <div className="subscriptionplan-name">Weekly</div>
                </div>

                {/* Monthly Plan */}
                <div className="subscriptionplan-plan-card monthly">
                    <Link to='/monthlyplan'><img src={assets.standard_plan} alt="Monthly Plan" className="subscriptionplan-plan-image" /></Link>
                    <div className="subscriptionplan-name">Monthly</div>
                </div>

                {/* Quarterly Plan */}
                <div className="subscriptionplan-plan-card quarterly">
                    <Link to='/quarterlyplan'><img src={assets.premium_plan} alt="Quarterly Plan" className="subscriptionplan-plan-image" /></Link>
                    <div className="subscriptionplan-name">Quarterly</div>
                </div>
            </div>
        </>
    )
}

export default SubscriptionPlans
