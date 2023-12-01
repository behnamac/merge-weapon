import { _decorator, Camera, Component, geometry, instantiate, Node, physics, PhysicsSystem, RigidBody, Vec3 } from 'cc';
import { Weapon } from './Weapon';
import Calculate from '../Tools/Calculate';
const { ccclass, property } = _decorator;

@ccclass('Mortar')
export class Mortar extends Weapon {
    @property(Camera)
    camera: Camera = null

    hitPoint: Vec3 = new Vec3
    update(dt: number): void {
        this.Aim()
    }
    Aim()
    {
        let ray = new geometry.Ray();
        ray.o = this.camera.node.position
        ray.d = this.camera.node.forward
        // The following parameters are optional
        const mask = 0xffffffff;
        const maxDistance = 9999999999;
        const queryTrigger = true;

        if (PhysicsSystem.instance.raycastClosest(ray, mask, maxDistance, queryTrigger)) {
            const raycastClosestResult = PhysicsSystem.instance.raycastClosestResult;
            this.hitPoint = raycastClosestResult.hitPoint
            const hitNormal = raycastClosestResult.hitNormal;
            const collider = raycastClosestResult.collider;
            const distance = raycastClosestResult.distance;  
            this.node.lookAt(this.hitPoint)
        }
    }

    Shoot(): void {
        super.Shoot()

        var VO = Calculate.CalculateVelocity(this.hitPoint, this._lastBullet.node.worldPosition, 1.5)
        var rigid = this._lastBullet.getComponent(RigidBody)
        rigid.setLinearVelocity(VO)

        this._lastBullet.Damage = this.damage
    }
}


