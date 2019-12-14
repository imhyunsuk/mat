import React from "react";

const Footer = () => {

  return (
    <div>
      <footer className="bg-light static-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 h-100 text-center text-lg-left my-5">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <a href="#">About</a>
                </li>
                <li className="list-inline-item">&sdot;</li>
                <li className="list-inline-item">
                  <a href="#">Contact</a>
                </li>
                <li className="list-inline-item">&sdot;</li>
                <li className="list-inline-item">
                  <a href="#">Terms of Use</a>
                </li>
                <li className="list-inline-item">&sdot;</li>
                <li className="list-inline-item">
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
              <p className="text-muted small mb-4">
                &copy; HSD 2019. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>
        {`
          footer {

          }
        `}
      </style>
    </div>
  );
};

export default Footer;
