import sponsors from '../../../assets/images/Bitmap.png';
import './sponsors.scss';

export function FooterComponent(): JSX.Element {
  return (
    <>
      <img className="sponsors" src={sponsors} alt="footer" />
    </>
  );
}
