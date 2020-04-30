import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <footer class="fixed_footer">
                <p>
                    <h>Useful Links</h>
                </p>
                <p>
                    <Link
                        id="about-us"
                        className="common-link"
                        to={'/about-us'}
                    >
                        About Us
                    </Link>
                </p>
                <p>
                    <Link id="contact" className="common-link" to={'/contact'}>
                        Contact
                    </Link>
                </p>
                <p>
                    <Link id="faq" className="common-link" to={'/faq'}>
                        FAQ
                    </Link>
                </p>
                <p>
                    <Link id="home" className="common-link" to={''}>
                        Home
                    </Link>
                </p>
                <p>
                    <Link id="sing-in" className="common-link" to={'/sign-in'}>
                        Sign in
                    </Link>
                </p>
                <p>©Copyright 2020 by CS476. All rights reversed.</p>
            </footer>
        </div>
    );
};
export default Footer;
