import { _decorator, Component, ICollisionEvent, ITriggerEvent, Node } from 'cc';
import { CollisionSystem } from '../Component/CollisionSystem';
import { EnemyMove } from '../Enemy/EnemyMove';
import { EnemyHealth } from '../Enemy/EnemyHealth';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends CollisionSystem {

    Damage: number = 0
    onTriggerEnter(event: ITriggerEvent)
    {
        this.OnHitAny(event)
        if(event.otherCollider.getComponent(EnemyHealth))
        {
            this.OnHitEnemy(event.otherCollider.getComponent(EnemyHealth))
        }
    }
    onCollisionEnter(event: ICollisionEvent): void 
    {
        this.OnCollisionAny(event)
        if(event.otherCollider.getComponent(EnemyHealth))
        {
            this.OnCollisionEnemy(event.otherCollider.getComponent(EnemyHealth))
        }
    }

    OnHitEnemy(enemy: EnemyHealth)
    {
    }
    OnHitAny(event: ITriggerEvent)
    {
    }

    OnCollisionEnemy(enemy: EnemyHealth)
    {
    }
    OnCollisionAny(event: ICollisionEvent)
    {
    }
}


