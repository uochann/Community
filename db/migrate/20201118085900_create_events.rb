class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.references :room, foreign_key: true
      t.string :title
      t.text :content
      t.datetime :start_time
      t.timestamps
    end
  end
end
