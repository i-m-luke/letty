import { type Db as DB, type WithId, type Document, ObjectId } from "mongodb";
import type { WithId as _WithId } from "$types";
import type { ZodSchema } from "zod";

export default abstract class BaseDAO<TObject, TNewObject extends Object> {
  protected collection;
  private objectSchema;
  constructor(db: DB, collectionName: string, objectSchema: ZodSchema<TObject>) {
    this.collection = db.collection(collectionName);
    this.objectSchema = objectSchema;
  }

  async get(data: Partial<TObject>): Promise<TObject> {
    return this.objectSchema.parse(
      this.convertDbItem(await this.collection.findOne({ data }))
    );
  }

  async getAll(): Promise<TObject[]> {
    const data = (await this.collection.find({}).toArray()).map(this.convertDbItem);
    return data.map((data) => this.objectSchema.parse(data));
  }

  async getById(id: string): Promise<TObject> {
    const data = await this.collection.findOne({
      id: id,
    });
    return this.objectSchema.parse(this.convertDbItem(data));
  }

  async insert(data: TNewObject): Promise<TObject> {
    return this.objectSchema.parse(
      this.convertDbItem(
        await this.collection
          .insertOne({ userId: "TODO: Added from BaseDAO.insert", ...data })
          .then((res) =>
            this.collection.findOne({ _id: res.insertedId }).then((res) => res)
          )
      )
    );
  }

  async update(
    id: string,
    data: Partial<Omit<TObject, keyof _WithId>>
  ): Promise<void> {
    this.collection.updateOne({ _id: new ObjectId(id) }, data);
  }

  async delete(data: TObject): Promise<boolean> {
    return this.collection.deleteOne({ data }).then((res) => res.acknowledged);
  }

  protected convertDbItem(item: WithId<Document> | null) {
    return item !== null
      ? {
          ...item,
          _id: item._id.toString(),
        }
      : null;
  }
}
