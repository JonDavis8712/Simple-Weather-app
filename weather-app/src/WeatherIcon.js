import React from 'react';
import App from './App';


class WeatherIcons extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            icon: props.icon,
            iconUrls: {
                "02d": "https://lh3.googleusercontent.com/FSHoUidPh2Pw7aNCnbuXKIzOywpWEgsoirVu6-zDVmwOZBgqHrzlRZzxNjXxomvjP-183FoZZElCdGGfgrXHxhApxkk2boktFYKTWin4apoWf0hIQvV53Dxs7fNhdnCb0_y0YEY6zg=s256-p-k",
                "01d": "https://lh3.googleusercontent.com/CVm25tt39p5RDIDhqPo13J2d4CMqXEHt-fqO0tU_k0iYkQxzaZ4LTMIg0RSHXqLw26QAYOMFxfVAjstt0CH7wTZD2w6ZJx9sZR4PjX8-i0-wy-Xfa5wiRn4iDBN1CQCLO5Y8vyKpaA=s256-p-k",
                "01n": "https://lh3.googleusercontent.com/dgNBgb-P9BcUfPxAoadF-SW2NdtHvYQs78fkTcFICgVvU7qA-Aygd-Q2GgHx983Atqp37dYaUHsKYXSS0l38OrZiHv_dKigfTRNoocWDIw__rAKi6Gx1Lu8wB43BDuefR67uk4mddA=s256-p-k",
                "02n": "https://lh3.googleusercontent.com/IviLsxiGvw2xZDgElIx9g1rWqpUWya1rzfPsk2fKZSbTM9WsrtphJPHfwafejPi4IRZDPyDK8Bx8veRZUUOJdR47wlZBN7ZZRihuxKvunWxwPBE0-kt1IoYJ_EhAbRUf8sClpTVuKQ=s256-p-k",
                "03d": "https://lh3.googleusercontent.com/b469shsDxP9_S574ps6TrQgC5EcVD3REqOqte_ZIuPClcZ3PNLBfbq4jqp29m-K5SYdAMIvRoEODwy6v7xBtm3nSjnRUOyoAZ28CAsJv5hiHS-tA4ADBUbgoxFHmXEeAkk5qqZrpow=s256-p-k",
                "03n": "https://lh3.googleusercontent.com/b469shsDxP9_S574ps6TrQgC5EcVD3REqOqte_ZIuPClcZ3PNLBfbq4jqp29m-K5SYdAMIvRoEODwy6v7xBtm3nSjnRUOyoAZ28CAsJv5hiHS-tA4ADBUbgoxFHmXEeAkk5qqZrpow=s256-p-k",
                "04d": "https://lh3.googleusercontent.com/O8oyDPBEV97T0uIHkUvSWvoJfMn2TepfesbsTZs-ez5MtduAoVngnyzThEKeMaw49oBQoyUPl5R74vz9QB8JTMRm2wTwEU8FqSKiayYdxVOWRTTb7peEkNJ4VLFD2aX-1E3QsplTXw=s256-p-k",
                "04n": "https://lh3.googleusercontent.com/O8oyDPBEV97T0uIHkUvSWvoJfMn2TepfesbsTZs-ez5MtduAoVngnyzThEKeMaw49oBQoyUPl5R74vz9QB8JTMRm2wTwEU8FqSKiayYdxVOWRTTb7peEkNJ4VLFD2aX-1E3QsplTXw=s256-p-k",
                "09d": "https://lh3.googleusercontent.com/NO53na83olxa61LXPHIAsrBOjs38wCyebP4uTvN77gskBMUO4Mlz2ZiUiAtSQcfpJJIyFD5wkT8Gg438afpxVwcHSX6JhYuCGu6NMlv-uhxoEy0TlEhlah05roYnEN2XHmjmZLyrFg=s256-p-k",
                "09n": "https://lh3.googleusercontent.com/NO53na83olxa61LXPHIAsrBOjs38wCyebP4uTvN77gskBMUO4Mlz2ZiUiAtSQcfpJJIyFD5wkT8Gg438afpxVwcHSX6JhYuCGu6NMlv-uhxoEy0TlEhlah05roYnEN2XHmjmZLyrFg=s256-p-k",
                "10d": "https://lh3.googleusercontent.com/2JTkHUHHw1X3XTEsKzoZINr0sY3ovmxjQU1FWLu9bsKMIbR0SYXpLpRCDKoLUkeyv2yoxsx14EddyedQgQrLPuvCXNe52CdZIGuQCLqwk91G2wO8-ry_L81hwC--menjkgawlUvk_g=s256-p-k",
                "10n": "https://lh3.googleusercontent.com/uEZWIHLEcaiIsA5hL1cWAW0AmyeT43u5_jAN4-tdAw4nV8lugZ34kit0f3pWcrXS8sVPKACkO7yLH6xA2TmFujhDt1TmLrs9iRPIikjCrenzPdarcP9ntezrkLRwedaJOFMSzyqppQ=s256-p-k",
                "11d": "https://lh3.googleusercontent.com/89BbiQUPrg3b0wLGRUJvv9RJUJzobE6sDjNeAVneqCFO3ct0aI7ctyS78ol5Z8SvkvPbC-CjWuuo_3jl0caPzkjGJ1_FwS7FQ1K6qX3K0dHbL87TZfBnxxFjs7MlYO3phPg69d3eHA=s256-p-k",
                "11n": "https://lh3.googleusercontent.com/89BbiQUPrg3b0wLGRUJvv9RJUJzobE6sDjNeAVneqCFO3ct0aI7ctyS78ol5Z8SvkvPbC-CjWuuo_3jl0caPzkjGJ1_FwS7FQ1K6qX3K0dHbL87TZfBnxxFjs7MlYO3phPg69d3eHA=s256-p-k",
                "13d": "https://lh3.googleusercontent.com/6ifd3kbEP93pZh_a7WoAL0T_9SZW1zBER1o8sNVrBQyNgnC1tavW7IC3e3I_bRLy4YCl82bpGSRVO1K3dLpNitQ9i-Xa-PG2jrWVq6jT5TUPm4c-88Vy_kRSctKQ2cUfFSW_XTlr3A=s256-p-k",
                "13n": "https://lh3.googleusercontent.com/xhqwxuqnpDZnq0brMQft-P9QSq6v18DAYPTGC25mHdm8Nwqo281w7kIf6O4h-1l8zRSxWCVr9AZtb-8KzLD6bDESx9VQPBJewbzEizAavlUUdkZHy-pu7To1nVYZfRWY1_jyJ_-Vjg=w2400",
                "50n": "https://lh3.googleusercontent.com/F8oBwMSajM9tcSZxVtocfHCMIq8opp02KhUAIpqj8amvjGQHDv591Tki1ww91FMNYaZ3z4ZOua-jtQpUHBqRH__TPDVwj1owMb0sOuq0m8itvNYvrTJsw6nZy_06HoOY4S5EZGnUNQ=w2400",
                "50d": "https://lh3.googleusercontent.com/F8oBwMSajM9tcSZxVtocfHCMIq8opp02KhUAIpqj8amvjGQHDv591Tki1ww91FMNYaZ3z4ZOua-jtQpUHBqRH__TPDVwj1owMb0sOuq0m8itvNYvrTJsw6nZy_06HoOY4S5EZGnUNQ=w2400"
            },
        };
    }
    componentDidUpdate(prevProps) {
        if (this.props.icon!== prevProps.icon) {
            this.setState({ icon: this.props.icon });
        }
    }
    render() {
        const { icon, iconUrls } = this.state;
        const iconUrl = iconUrls[icon] || "";
        return (
            <img className="icon" src={iconUrl} alt="Weather Icon" />
        )
    }

}

export default WeatherIcons;
