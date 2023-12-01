import { _decorator, Camera, Component, EventMouse, geometry, Input, input, math, Node, PhysicsRayResult, PhysicsSystem } from 'cc';
import { Weapon } from './Weapon';
import { eventManager } from '../Manager/EventManager';
const { ccclass, property } = _decorator;

@ccclass('LinerWeapon')
export class LinerWeapon extends Weapon {
    @property(Camera)
    camera: Camera = null

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
            const hitPoint = raycastClosestResult.hitPoint
            const hitNormal = raycastClosestResult.hitNormal;
            const collider = raycastClosestResult.collider;
            const distance = raycastClosestResult.distance;  
            this.node.lookAt(hitPoint)
            this.shootPoint.lookAt(hitPoint)
        }
    }
}


