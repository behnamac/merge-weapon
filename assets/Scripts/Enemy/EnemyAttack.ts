import { _decorator, Component, ITriggerEvent, Node } from 'cc';
import { CollisionSystem } from '../Component/CollisionSystem';
import { PlayerHealth } from '../Player/PlayerHealth';
import { EnemyMove } from './EnemyMove';
const { ccclass, property } = _decorator;

@ccclass('EnemyAttack')
export class EnemyAttack extends CollisionSystem {

    @property(Number)
    delayAttack: number = 1

    _activeAttack: boolean = false
    _currentDelay: number = 0

    _playerHealth: PlayerHealth = null
    start(): void {
        super.start()
        this._currentDelay = this.delayAttack
    }
    onTriggerEnter(event: ITriggerEvent): void 
    {
        if(event.otherCollider.getComponent(PlayerHealth))
        {
            this._playerHealth = event.otherCollider.getComponent(PlayerHealth)
            this._activeAttack = true

            this.getComponent(EnemyMove).speed = 0
        }
    }

    update(dt: number): void {
        if(!this._activeAttack) return
        this._currentDelay -= dt
        if(this._currentDelay <= 0)
        {
            this._playerHealth.TakeDamage(1)
            this._currentDelay = this.delayAttack
        }
    }
}


