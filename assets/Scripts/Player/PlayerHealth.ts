import { _decorator, Component, Node, Sprite } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { eventManager } from '../Manager/EventManager';
const { ccclass, property } = _decorator;

@ccclass('PlayerHealth')
export class PlayerHealth extends Component {
    @property(Number)
    health: number = 100
    @property(Sprite)
    healthBar: Sprite = null

    _currentHealth: number = 0

    onLoad() {
        this._currentHealth = this.health
    }
    start() {
        eventManager.addEventListener("OnLevelReset", ()=> this.OnLevelReste())
    }
    TakeDamage(value: number)
    {
        this._currentHealth -= value
        this.healthBar.fillRange = this._currentHealth/this.health
        if(this._currentHealth <= 0)
        {
            this.Dead()
        }
    }
    Dead()
    {
        GameManager.Instance.LevelFail()
    }

    OnLevelReste()
    {
        this._currentHealth = this.health
        this.healthBar.fillRange = 1
    }
}


