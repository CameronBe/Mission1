import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <h2 className="footer-title">Get in Touch</h2>
        <p className="footer-paragraph">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure
          excepturi possimus animi sed corporis ex modi adipisci qui accusamus
        </p>
        <div className="footer-social-group">
          <img
            className="footer-social"
            src="https://cdn-icons-png.flaticon.com/512/15713/15713420.png"
            alt="instagram social"
          />
          <img
            className="footer-social"
            src="https://cdn-icons-png.flaticon.com/512/2504/2504942.png"
            alt="instagram social"
          />
          <img
            className="footer-social"
            src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png"
            alt="instagram social"
          />
          <img
            className="footer-social"
            src="https://cdn-icons-png.flaticon.com/512/3256/3256013.png"
            alt="instagram social"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
