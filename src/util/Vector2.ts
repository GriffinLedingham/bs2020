class Vector2 {
  private x: number;
  private y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get(key: string): number {
    return this[key];
  }

  equals(vector: Vector2): boolean {
    return this.x == vector.x && this.y == vector.y;
  }

  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }
}

export default Vector2;
