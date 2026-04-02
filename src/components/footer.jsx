import linkedIn from '../assets/linkedin.svg'
import fb from '../assets/facebook.svg'
import github from '../assets/github.svg'


const SocialLink = ({ imgSrc, toLink }) => {
    return (
        <a href={toLink} target='_blank'>
            <img src={imgSrc} className='w-8 h-8' />
        </a>
    )
}

const Footer = () => {
    return (
        <div className="mt-auto h-24 w-full flex flex-col justify-center items-center gap-2 border-t border-brdClr">
            <a href="https://github.com/TahraouiMustapha"
                target="_blank"
                className='border-b border-brdClr'>
                made By <span className='text-primary'>Tahraoui Mustapha</span>
            </a>
            <div className='flex w-40 justify-around'>
                <SocialLink imgSrc={linkedIn} toLink='https://www.linkedin.com/in/tahraoui-mustapha-b50747367/' />
                <SocialLink imgSrc={fb} toLink='https://www.facebook.com/moustapha.tahraoui' />
                <SocialLink imgSrc={github} toLink='https://github.com/TahraouiMustapha' />
            </div>
        </div>
    )
}

export default Footer;