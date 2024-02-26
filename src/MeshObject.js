import { BoxGeometry, Mesh, MeshLambertMaterial } from "three";

export class MeshObject {
  constructor(info) {
    this.name = info.name;
    this.width = info.width || 1;
    this.height = info.height || 1;
    this.depth = info.depth || 1;
    this.color = info.color || "white";
    this.diffrenceY = info.diffrenceY || 0.4;
    this.x = info.x || 0;
    this.y = info.y || this.height / 2 + this.diffrenceY;
    this.z = info.z || 0;
    this.rotationX = info.rotationX || 0;
    this.rotationY = info.rotationY || 0;
    this.rotationZ = info.rotationZ || 0;

    if (info.modelSrc) {
      // GLB
      info.loader.load(
        info.modelSrc,
        (glb) => {
          glb.scene.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
            }
          });
          this.mesh = glb.scene;
          this.mesh.position.set(this.x, this.y, this.z);
          this.mesh.rotation.set(
            this.rotationX,
            this.rotationY,
            this.rotationZ
          );
          info.scene.add(this.mesh);
        },
        (xhr) => {
          console.log("loading...");
        },
        (error) => {
          console.log("error");
        }
      );
    } else if (info.mapSrc) {
      const geometry = new BoxGeometry(this.width, this.height, this.depth);
      info.loader.load(info.mapSrc, (texture) => {
        console.log(texture);
        const material = new MeshLambertMaterial({
          map: texture,
        });
        this.mesh = new Mesh(geometry, material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.position.set(this.x, this.y, this.z);
        this.mesh.rotation.set(this.rotationX, this.rotationY, this.rotationZ);

        info.scene.add(this.mesh);
      });
    } else {
      // Primitives
      const geometry = new BoxGeometry(this.width, this.height, this.depth);
      const material = new MeshLambertMaterial({
        color: this.color,
      });

      this.mesh = new Mesh(geometry, material);
      this.mesh.castShadow = true;
      this.mesh.receiveShadow = true;
      this.mesh.position.set(this.x, this.y, this.z);
      this.mesh.rotation.set(this.rotationX, this.rotationY, this.rotationZ);

      info.scene.add(this.mesh);
    }
  }
}
