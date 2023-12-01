import { _decorator, Component, Node } from 'cc';
import { eventManager } from '../Manager/EventManager';
import { Weapon } from './Weapon';
const { ccclass, property } = _decorator;

@ccclass('WeaponController')
export class WeaponController extends Component {
    private _canShoot: boolean

    private _weapon: Weapon

    onLoad()
    {
        this.FindWeapon()   
    }
    start()
    {
        eventManager.addEventListener("OnLevelStart", () => this.OnLevelStart());
        eventManager.addEventListener("OnLevelCompelet", () => this.OnLevelCompelet());
        eventManager.addEventListener("OnLevelFail", () => this.OnLevelFail());
    }
    onDestroy() {
        eventManager.removeEventListener("OnLevelStart", () => this.OnLevelStart());
        eventManager.removeEventListener("OnLevelCompelet", () => this.OnLevelCompelet());
        eventManager.removeEventListener("OnLevelFail", () => this.OnLevelFail());
    }
    update(deltaTime: number) 
    {
        if(!this._canShoot) return
        if(!this._weapon)
        {
            this.FindWeapon()
            return
        }
        this._weapon.ActiveShoot(deltaTime)
    }
    FindWeapon()
    {
        this._weapon = this.getComponentInChildren(Weapon)
    }

    OnLevelStart()
    {
        this._canShoot = true
    }
    OnLevelCompelet()
    {
        this._canShoot = false
    }
    OnLevelFail()
    {
        this._canShoot = false
    }
}


