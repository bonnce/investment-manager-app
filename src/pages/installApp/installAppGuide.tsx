import { CHROMEGUIDE, DESKTOP1, DESKTOP2, DESKTOP3, IOSMACOS1, IOSMACOS2, IOSMACOS3, IOSMACOS4, ANDROID1, ANDROID2 } from "./guide"
import desktopDowndload from 'assets/images/desktopDowndload.svg'
import kebabMenu from 'assets/images/kebabMenu.svg'
import mobileInstall from 'assets/images/mobileInstall.svg'
import safari from 'assets/images/safari.svg'
import shareIOS from 'assets/images/shareIOS.svg'
import squarePlus from 'assets/images/squarePlus.svg'
import chrome from 'assets/images/chrome.svg'
import { ThemedIcon, InstallApp, Icon } from "components"

const InstallAppGuide = ()=>
<div className="container column gap-lg install-guide">
    <div className="container column">
        <h3 className="guide-title">Chrome
        <Icon icon={chrome} alt="chrome" className="guide-icon" />
        </h3>
        <p className="guide-content">{CHROMEGUIDE}</p>
        <InstallApp />
    </div>
    <div className="container column">
        <h3 className="guide-title">IOS and MACOS</h3>
        <p className="guide-content">
            {IOSMACOS1}
            <Icon icon={safari} alt="safari" className="guide-icon" />
            {IOSMACOS2}
            <ThemedIcon icon={shareIOS} alt="shareIOS" className="guide-icon" />
            {IOSMACOS3}
            <ThemedIcon icon={squarePlus} alt="squarePlus" className="guide-icon" />
            {IOSMACOS4}
        </p>
    </div>
    <div className="container column">
        <h3 className="guide-title">Android</h3>
        <p className="guide-content">
            {ANDROID1}
            <ThemedIcon icon={kebabMenu} alt="kebabMenu" className="guide-icon" />
            {ANDROID2}
            <ThemedIcon icon={mobileInstall} alt="mobileInstall" className="guide-icon" />
        </p>
    </div>
    <div className="container column">
        <h3 className="guide-title">DESKTOP</h3>
        <p className="guide-content">
            {DESKTOP1}
            <ThemedIcon icon={desktopDowndload} alt="desktopDowndload" className="guide-icon" />
            {DESKTOP2}
            <ThemedIcon icon={kebabMenu} alt="kebabMenu" className="guide-icon" />
            {DESKTOP3}
        </p>
    </div>
</div>

export default InstallAppGuide
