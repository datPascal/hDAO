import {css} from 'lit';


export const Styles = css`

  .navMenu {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        }
        .navMenu a {
      color: #f0e8e8;
      text-decoration: none;
      font-size: 1.2em;
      text-transform: uppercase;
      font-weight: 500;
      display: inline-block;
      width: 400px;
      -webkit-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;
    }

    .navMenu a:hover {
      color: #fddb3a;
    }

    .navMenu a:nth-child(1):hover ~ .dot {
      -webkit-transform: translateX(30px);
      transform: translateX(30px);
      -webkit-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;
      opacity: 1;
    }

    .navMenu a:nth-child(2):hover ~ .dot {
      -webkit-transform: translateX(110px);
      transform: translateX(120px);
      -webkit-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;
      opacity: 1;
    }

    .navMenu a:nth-child(3):hover ~ .dot {
      -webkit-transform: translateX(200px);
      transform: translateX(200px);
      -webkit-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;
      opacity: 1;
    }

    .navMenu a:nth-child(4):hover ~ .dot {
      -webkit-transform: translateX(285px);
      transform: translateX(285px);
      -webkit-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;
      opacity: 1;
    }
`;


