import React from 'react';

export const Home_New = () => {
    return (
        <div className="homepage-container container-fluid p-5 pt-0">
            <div className="container">
                <div className="header-block d-flex-center">
                    <h1 className="d-flex-center text-center fw-700">Secure File Transfer</h1>
                </div>
                <br/>
                <br/>

                <div className="row mt-5">
                    <div className="col-6">
                        <div className="img-wrap">
                            <img src="/images/secure.jpg" alt="float"/>
                        </div>
                    </div>
                    <div className="col-6 d-flex-center">
                        <div>
                            <h1>Secure</h1>
                            <p>The story of the MSC Group began in Brussels in 1970, when captain Gianluigi
                                Aponte
                                founded
                                the company with just a small cargo ship: the MV Patricia. The business has
                                since
                                grown and
                                diversified to include a highly successful cruise line and passenger ferry
                                services,
                                as well
                                as leading inland and port terminal infrastructure. Headquartered in Geneva, the
                                Group
                                remains privately owned and focused on caring for customers, employees and the
                                environment.</p>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="m-5"></div>
                <br/>
                <br/>


                <div className="row mt-5">
                    <div className="col-6 d-flex-center">
                        <div>
                            <h1>Fast</h1>
                            <p>The story of the MSC Group began in Brussels in 1970, when captain Gianluigi Aponte
                                founded
                                the company with just a small cargo ship: the MV Patricia. The business has since
                                grown and
                                diversified to include a highly successful cruise line and passenger ferry services,
                                as well
                                as leading inland and port terminal infrastructure. Headquartered in Geneva, the
                                Group
                                remains privately owned and focused on caring for customers, employees and the
                                environment.</p>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="img-wrap">
                            <img src="/images/rocket.jpg" alt="float"/>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};