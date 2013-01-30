class CreateNotes < ActiveRecord::Migration
  def up
    create_table :notes do |t|
      t.string :title
      t.text :summary
      t.text :description
    end
  end

  def down
    drop_table :notes
  end
end
